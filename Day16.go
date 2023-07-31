// ================= DAY16 =================
// DAY 16 => Author ke BLOG-Blognya

package main

import (
	"Day11-web/connection"
	"Day11-web/middleware"
	"context"
	"database/sql"
	"fmt"
	"html/template"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
)

type Blog struct {
	Id       int
	Title    string
	Content  string
	Image    string
	Author   string
	PostDate time.Time
}

type User struct {
	Id             int
	Name           string
	Email          string
	HashedPassword string
	Experience     []string
	Year           []string
}

type UserLoginSession struct {
	IsLogin bool
	Name    string
	Role    string
}

var userLoginSession = UserLoginSession{}

func main() {
	e := echo.New()

	connection.DatabaseConnect()

	e.Use(session.Middleware(sessions.NewCookieStore([]byte("Setiawan Jodi"))))

	e.Static("/Assest", "Assest")
	//EPS16 2.3 Midelawer jadi Static
	e.Static("/uploads", "uploads")

	e.GET("/", home)
	e.GET("/project", project) //EPS16 2.1 Midelware di masukin
	e.GET("/project-detail/:id", projectDetail)
	e.GET("/testimonial", testimonial)
	e.GET("/contact", contact)

	e.GET("/bootstrap", bootstrap)
	e.GET("/contactboot", contactBoot)
	e.GET("/projectboot", projectBoot)

	e.POST("/add-blog", middleware.UploadFile(addBlog))

	e.POST("/detail-blog/:id", deleteBlog)

	e.GET("/update-blog-form/:id", updateBlogForm)
	e.POST("/update-blog", updateBlog)

	e.GET("/form-login", formLogin)
	e.POST("/login", login)

	e.GET("/form-register", formRegister)
	e.POST("/register", register)

	e.POST("/logout", logout)

	e.Logger.Fatal(e.Start("localhost:5000"))
}

// ======== NGATUR Function ========

// ------------------------------------------------------------
// ==========HOME==========
// 3. Masukin HTML Roting ke Golang
func home(c echo.Context) error {
	//a. proses pengambilan html ke roiting
	tmpl, err := template.ParseFiles("View/index.html")
	//harus 2 variabel
	userId := 3

	//b, pembuatan Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	var dataUser User

	errQuery := connection.Conn.QueryRow(context.Background(), "SELECT id,name, email, experience, year FROM tb_user WHERE id=$1", userId).Scan(&dataUser.Id, &dataUser.Name, &dataUser.Email, &dataUser.Experience, &dataUser.Year)

	if errQuery != nil {
		return c.JSON(http.StatusInternalServerError, errQuery.Error())
	}

	sess, errSess := session.Get("session", c)
	if errSess != nil {
		return c.JSON(http.StatusInternalServerError, errSess.Error())
	}

	flash := map[string]interface{}{
		"FlashMessage": sess.Values["message"], //Register Behasil
		"FlashStatus":  sess.Values["status"],  //True
	}

	delete(sess.Values, "message")
	delete(sess.Values, "status")
	sess.Save(c.Request(), c.Response())

	dataRespone := map[string]interface{}{
		"User":  dataUser,
		"Flash": flash,
	}

	return tmpl.Execute(c.Response(), dataRespone)

}

// ------------------------------------------------------------
// ==========PROJECT==========
func project(c echo.Context) error {
	tmpl, err := template.ParseFiles("View/project.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	//EPS16 1.1 => Memasuk Query ke sini
	//EPS16 1.3 => Problem Solving Pakai dari LEFT ke INNER JOIN
	dataBlogs, errBlogs := connection.Conn.Query(context.Background(), "SELECT tb_blog.id, tb_user.name, tb_blog.title, tb_blog.content,  tb_blog.image, tb_blog.post_date FROM tb_blog LEFT JOIN tb_user ON tb_blog.author_id = tb_user.id")

	if errBlogs != nil {
		return c.JSON(http.StatusInternalServerError, errBlogs.Error())
	}

	var resultBlogs []Blog

	for dataBlogs.Next() {
		var each = Blog{}

		//EPS16 1.4 => bikin var sqlNullString
		var tempAuthor sql.NullString // temp -> temporary -> sementara

		//EPS16 1.2 => Tidak di pakai lagi sudah auto = MATIIN
		// each.Author = "Surya Elidanto"

		err := dataBlogs.Scan(&each.Id, &tempAuthor, &each.Title, &each.Content, &each.Image, &each.PostDate)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err.Error())
		}

		//EPS16 1.5 => Bikin Nill jadi bisa
		each.Author = tempAuthor.String

		resultBlogs = append(resultBlogs, each)
	}

	sess, _ := session.Get("session", c)

	if sess.Values["isLogin"] != true {
		userLoginSession.IsLogin = false
	} else {
		userLoginSession.IsLogin = true
		userLoginSession.Name = sess.Values["name"].(string) //hesting
	}

	data := map[string]interface{}{
		"Blog":             resultBlogs,
		"UserLoginSession": userLoginSession,
	}

	return tmpl.Execute(c.Response(), data)

}

// ------------------------------------------------------------
// ==========TESTIMONIALS==========
func testimonial(c echo.Context) error {
	tmpl, err := template.ParseFiles("View/testimonials.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return tmpl.Execute(c.Response(), nil)

}

// ------------------------------------------------------------
// ==========CONTACT==========
func contact(c echo.Context) error {
	tmpl, err := template.ParseFiles("View/contact.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return tmpl.Execute(c.Response(), nil)

}

// ------------------------------------------------------------
// ==========PROJECTDETAILS==========
func projectDetail(c echo.Context) error {
	id := c.Param("id") //misal 1

	tmpl, err := template.ParseFiles("View/InProject.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	idToInt, _ := strconv.Atoi(id)

	detailBlog := Blog{}

	//Eps16 1.8 persis kaya di Project
	var tempAuthor sql.NullString

	//EPS 16 1.7 => Masukin Query dari Projec ke sini dan menampal tempAuthor, WHERE tb_blog=$1
	errQuery := connection.Conn.QueryRow(context.Background(), "SELECT tb_blog.id, tb_user.name, tb_blog.title, tb_blog.content,  tb_blog.image, tb_blog.post_date FROM tb_blog LEFT JOIN tb_user ON tb_blog.author_id = tb_user.id WHERE tb_blog.id=$1", idToInt).Scan(&detailBlog.Id, &tempAuthor, detailBlog.Title, &detailBlog.Content, &detailBlog.Image, &detailBlog.PostDate)
	fmt.Println("ini data blog detail:", errQuery)

	//EPS16 1.9 ini tempAuthor STRING
	detailBlog.Author = tempAuthor.String

	projectDetail := map[string]interface{}{
		"Id":   id,
		"Blog": detailBlog,
	}

	return tmpl.Execute(c.Response(), projectDetail)

}

// ------------------------------------------------------------
// ==========ADDBLOG==========
func addBlog(c echo.Context) error {

	title := c.FormValue("input-porject-title")
	content := c.FormValue("input-description")
	startDate := c.FormValue("startdate")
	endDate := c.FormValue("endate")

	//EPS16 2.2 => masukin middleware
	image := c.Get("dataFile").(string) //image 123124

	//EPS16 1.7 => bikin sess
	sess, _ := session.Get("session", c)

	// Eps16 1.6 => author_id masukin
	test, err := connection.Conn.Exec(context.Background(), "INSERT INTO tb_blog (title, content, image, post_date, end_date, author_id) VALUES ($1, $2, $3, $4, $5, $6)", title, content, image, startDate, endDate, sess.Values["id"].(int))

	// ... (your existing code)

	fmt.Println("row affected: ", test.RowsAffected())

	if err != nil {
		fmt.Println("error guys")
		c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.Redirect(http.StatusMovedPermanently, "/project")
}

// ------------------------------------------------------------
// ==========DeletBlog==========
func deleteBlog(c echo.Context) error {
	id := c.Param("id")

	idToInt, _ := strconv.Atoi(id)

	//!! BACA
	// EPS12 => Pembuatan saat click akan ke delet
	// dataBlogs = append(dataBlogs[:idToInt], dataBlogs[idToInt+1:]...)

	//EPS 14 3.1 => Query Delet
	connection.Conn.Exec(context.Background(), "DELETE FROM tb_blog WHERE id=$1", idToInt)

	return c.Redirect(http.StatusMovedPermanently, "/project")
}

// ------------------------------------------------------------
// ========== Update BLOG FORM==========

// EPS 14 4.2 => Fun UpdateForm
func updateBlogForm(c echo.Context) error {
	// Get the blog ID from the URL parameter
	id := c.Param("id")

	// Parse the update-blog.html template
	tmpl, err := template.ParseFiles("View/update-blog.html")
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	// Create a map to pass data to the template
	data := map[string]interface{}{
		"Id": id,
	}

	// Execute the template and pass the data
	return tmpl.Execute(c.Response(), data)
}

// ------------------------------------------------------------
// ========== Update BLOG ==========

// EPS 14 4.3 => Fun UpdateBlog
func updateBlog(c echo.Context) error {
	//Eps12 param buat delet ngambil dari paling atas
	id := c.FormValue("id")
	title := c.FormValue("input-porject-title")
	content := c.FormValue("input-description")

	fmt.Println("id", id)
	fmt.Println("title", title)
	fmt.Println("content", content)

	idToInt, _ := strconv.Atoi(id)

	_, err := connection.Conn.Exec(context.Background(), "UPDATE tb_blog SET title=$1, content=$2 WHERE id=$3", title, content, idToInt)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.Redirect(http.StatusMovedPermanently, "/project")
}

// ----------------------- BOOTSTRAP -----------------------

// ==========BOOTSTRAP==========
func bootstrap(c echo.Context) error {
	tmpl, err := template.ParseFiles("ViewBootstrap/bootstrap.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return tmpl.Execute(c.Response(), nil)

}

// ========== Contact BOOTSTRAP ==========
func contactBoot(c echo.Context) error {
	tmpl, err := template.ParseFiles("ViewBootstrap/contactBoot.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return tmpl.Execute(c.Response(), nil)

}

// ========== Project BOOTSTRAP ==========
func projectBoot(c echo.Context) error {
	tmpl, err := template.ParseFiles("ViewBootstrap/projectBoot.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return tmpl.Execute(c.Response(), nil)

}

// ----------------------- LOGIN & REGISTER -----------------------
// EPS.15 1.1 BIKIN Fun Login dan Register
// ========== LOGIN  ==========

func formLogin(c echo.Context) error {

	//bikin pengecekan
	// ngambil dari session datanya, misalnya isLogin ->
	// Bikin kalau sudah login

	tmpl, err := template.ParseFiles("View/login.html")

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	//EPS 15 2.4 Cokkies masukin ke login
	sess, errSess := session.Get("session", c)
	if errSess != nil {
		return c.JSON(http.StatusInternalServerError, errSess.Error())
	}

	//EPS 15 2.5 biar kelihatan [sess]
	// fmt.Println("message:", sess.Values["message"])
	// fmt.Println("status:", sess.Values["status"])

	//EPS 15 2.6 => pembuatan cokies agar bisa muncul di html
	flash := map[string]interface{}{
		"FlashMessage": sess.Values["message"], //Register Behasil
		"FlashStatus":  sess.Values["status"],  //True
	}

	//EPS 15. 2.8 => delet agar saat selesai langsung hapus
	delete(sess.Values, "message")
	delete(sess.Values, "status")
	//Eps 15. 2.9 Save cookies
	sess.Save(c.Request(), c.Response())

	//Eps15 2.7 masukih flash
	return tmpl.Execute(c.Response(), flash)

}

func login(c echo.Context) error {
	inputEmail := c.FormValue("inputEmail")
	inputPassword := c.FormValue("inputPassword") // min / 4 Character

	//EPS 15 1.5 Struct USER
	user := User{}

	//QueryRow => satu doang
	//EPS 15 1.6 agar bisa di pakai login
	err := connection.Conn.QueryRow(context.Background(), "SELECT id,name,email,password FROM tb_user WHERE email=$1", inputEmail).Scan(&user.Id, &user.Name, &user.Email, &user.HashedPassword)

	if err != nil {
		return redirectWithMessage(c, "Login Gagal!", false, "/form-login")
	}

	errPassword := bcrypt.CompareHashAndPassword([]byte(user.HashedPassword), []byte(inputPassword))

	if errPassword != nil {
		return redirectWithMessage(c, "Login Gagal!", false, "/form-login")
	}

	//Eps 15 3.4 Masukin login biar bisa
	// return c.JSON(http.StatusOK, "Berhasil Login")

	//EPS 15 1.7 Membuat Session untuk user yang sudah login
	sess, _ := session.Get("session", c)
	sess.Options.MaxAge = 10800 // 3 JAM -> berapa lama expired
	sess.Values["message"] = "Login success!"
	sess.Values["status"] = true
	sess.Values["name"] = user.Name
	sess.Values["email"] = user.Email
	sess.Values["id"] = user.Id
	sess.Values["isLogin"] = true
	sess.Save(c.Request(), c.Response())

	return c.Redirect(http.StatusMovedPermanently, "/")
}

// =========================================
func formRegister(c echo.Context) error {

	tmpl, err := template.ParseFiles("View/register.html")

	sess, errSess := session.Get("session", c)
	if errSess != nil {
		return c.JSON(http.StatusInternalServerError, errSess.Error())
	}

	flash := map[string]interface{}{
		"FlashMessage": sess.Values["message"], //Register Behasil
		"FlashStatus":  sess.Values["status"],  //True
	}

	delete(sess.Values, "message")
	delete(sess.Values, "status")
	sess.Save(c.Request(), c.Response())

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return tmpl.Execute(c.Response(), flash)

}

func register(c echo.Context) error {
	inputName := c.FormValue("inputName")
	inputEmail := c.FormValue("inputEmail")
	inputPassword := c.FormValue("inputPassword") // 1234 -> adasfas

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(inputPassword), 10)

	if err != nil {
		// fmt.Println("masuk sini")
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	fmt.Println(inputName, inputEmail, inputPassword)

	query, err := connection.Conn.Exec(context.Background(), "INSERT INTO tb_user (name,email,password) VALUES($1, $2, $3)", inputName, inputEmail, hashedPassword)

	fmt.Println("affected row : ", query.RowsAffected())

	//eps15 2.10 gagal
	if err != nil {
		return redirectWithMessage(c, "Register Gagal", false, "/form-register")
	}

	return redirectWithMessage(c, "Register berhasil", true, "/form-login")

}

// ----------------------- LOG OUT -----------------------
// Eps15 4.1 Logout
func logout(c echo.Context) error {
	sess, _ := session.Get("session", c)
	sess.Options.MaxAge = -1 // Invalidate the session by setting MaxAge to -1
	sess.Save(c.Request(), c.Response())

	return redirectWithMessage(c, "Logout berhasil!", true, "/")
}

// EPS15 BIKIN REDERECT FUNCTION BIAR RAPI
func redirectWithMessage(c echo.Context, message string, status bool, redirectPath string) error {
	//EPS15 2.2 Memasuki Cokies error ke register
	sess, errSess := session.Get("session", c)

	if errSess != nil {
		// fmt.Println("masuk sini")
		return c.JSON(http.StatusInternalServerError, errSess.Error())
	}

	//EPS15 2.3 Membuat agar cokkies berwarna dan muncul
	// BERHASIL!
	sess.Values["message"] = message
	sess.Values["status"] = status
	sess.Save(c.Request(), c.Response())
	return c.Redirect(http.StatusMovedPermanently, redirectPath)
}
