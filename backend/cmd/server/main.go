package main

import (
	"log"
	"net/http"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Response struct{
	Message string `json:"message"`
}

func main() {
	e := echo.New()

	e.GET("/api/hello", handler)

  // Разрешаем запросы от React
    e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{"http://localhost:5173"},
        AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
    }))

	if err := e.Start(":8080"); err != nil{
	log.Fatal(err)
	}
}

func handler(c echo.Context) error {
	return c.JSON(http.StatusOK, Response{Message: "ок"})
}