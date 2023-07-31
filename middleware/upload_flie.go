//================= EPS16  =================
// ------ MIDDLEWARE ------

package middleware

import (
	"fmt"
	"io"
	"io/ioutil"
	"net/http"

	"github.com/labstack/echo/v4"
)

func UploadFile(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		file, err := c.FormFile("input-blog-image") //nangkap file (byte)

		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		src, err := file.Open() //ambil path

		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		defer src.Close() // LFO(last in first out), memory leaks

		fmt.Println("src:", src)
		// timeStamp := time.Now().Unix() //12431241

		// timeStampString := strconv.Itoa(int(timeStamp))

		// berhubungan dengan utils atau file
		tempFile, err := ioutil.TempFile("uploads", "image-*.png")

		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		defer tempFile.Close()

		fmt.Println("tempFile :", tempFile)

		writtenCopy, err := io.Copy(tempFile, src)

		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		fmt.Println("written copy:", writtenCopy)

		//melempar data Uploads
		data := tempFile.Name() //uploads/image
		fmt.Println("data name utuh:", data)
		filename := data[8:]

		fmt.Println("filename terpotong", filename)

		c.Set("dataFile", filename) // image-123142.

		return next(c)
	}
}
