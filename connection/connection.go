//================ DAY13 ================
//Pemasukan Database ke GOLANG
// CONECTION KE DATABASES

package connection

import (
	"context"
	"fmt"
	"os"

	"github.com/jackc/pgx/v5"
)

// 1.4 pembuatan Conn
var Conn *pgx.Conn

func DatabaseConnect() {
	//1.1 Copy dari WEB ada [NOTE!]

	//1.5 Erro bikin Var juga
	var err error

	//1.2 Pembuatan Conection string
	databaseUrl := "postgres://postgres:akusukasemua@localhost:5432/db_personal_web"

	//1.3 mengisi conection string
	Conn, err = pgx.Connect(context.Background(), databaseUrl)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}

	fmt.Println("Connected to databse!")
}
