// ============ BASIC GOLANG ============
// 1.harus ada di project golang
package main // 2.file utamanya
import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// 3.harus func main jg
func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start("localhost:5000"))
}
