package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type User struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
}

var Users = []User{
	{1, "John"},
	{2, "Bob"},
	{3, "Alice"},
}

func setupRouter() *gin.Engine {
	router := gin.Default()

	// GET /
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Hello, world!"})
	})

	// GET /users
	router.GET("/users", func(c *gin.Context) {
		c.JSON(http.StatusOK, Users)
	})

	// POST /users/create
	router.POST("/users/create", func(c *gin.Context) {
		var requestBody struct {
			Name string `json:"name"`
		}

		if err := c.ShouldBindJSON(&requestBody); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		newUser := User{
			ID:   len(Users) + 1,
			Name: requestBody.Name,
		}

		Users = append(Users, newUser)
		c.JSON(http.StatusCreated, newUser)
	})

	return router
}

func main() {
	router := setupRouter()
	err := router.Run(":8080")
	if err != nil {
		panic(err)
	}
}
