package main

import (
	"flag"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type user struct {
	ID   string `json:"id"`
	Name string `json:"title"`
}

type lobby struct {
	ID uuid.UUID `json:"id"`
}

var users = []user{
	{ID: "1", Name: "User 1"},
	{ID: "2", Name: "User 2"},
}

func main() {
	hub := NewHub()
	go hub.Run()

	flag.Parse()

	router := gin.Default()
	router.Use(CORSMiddleware())
	router.GET("/users", getUsers)
	router.GET("/users/:id", getUserByID)
	router.POST("lobby", createLobby)

	router.GET("/ws/:roomId", func(c *gin.Context) {
		roomId := c.Param("roomId")
		serveWs(c, roomId, hub)
	})

	router.Run("localhost:8080")

	// http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
	// 	serveWs(hub, w, r)
	// })

	// err := http.ListenAndServe(*addr, nil)
	// if err != nil {
	// 	log.Fatal("ListenAndServe: ", err)
	// }
}

// TODO: make sure this is how to setup CORS properly for gin
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func createLobby(c *gin.Context) {
	var newLobby lobby = lobby{
		ID: uuid.New(),
	}

	c.IndentedJSON(http.StatusCreated, newLobby)
}

func getUsers(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, users)
}

func postUsers(c *gin.Context) {
	var newUser user

	// Call BindJSON to bind the received JSON to
	// newUser.
	if err := c.BindJSON(&newUser); err != nil {
		return
	}

	// Add the new user to the slice.
	users = append(users, newUser)
	c.IndentedJSON(http.StatusCreated, newUser)
}

func getUserByID(c *gin.Context) {
	id := c.Param("id")

	for _, a := range users {
		if a.ID == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "user not found"})
}
