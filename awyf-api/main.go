package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type user struct {
	ID   string `json:"id"`
	Name string `json:"title"`
}

var users = []user{
	{ID: "1", Name: "User 1"},
	{ID: "2", Name: "User 2"},
}

func main() {
	router := gin.Default()
	router.GET("/users", getUsers)
	router.GET("/users/:id", getUserByID)

	router.Run("localhost:8080")
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
