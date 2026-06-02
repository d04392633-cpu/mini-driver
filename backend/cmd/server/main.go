package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"log"
	"net/http"
)

type Response struct {
	Message string `json:"message"`
}

func main() {
	e := echo.New()

	// Разрешаем запросы от React
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
	}))

	//Запросы
	e.GET("/api/hello", handler)

	// Старт с провркой на ошибки
	if err := e.Start(":8080"); err != nil {
		log.Fatal(err)
	}
}

// GET запрос путь:"/api/hello"
func handler(c echo.Context) error {
	return c.JSON(http.StatusOK, Response{Message: "ок"})
}
