using Microsoft.EntityFrameworkCore.Migrations;

namespace CarRentalAppDAL.Migrations
{
    public partial class CarrentalApplication : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CarLists",
                columns: table => new
                {
                    vechicle_id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    maker = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    model = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    color = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    rental_price = table.Column<double>(nullable: true),
                    image_file_name = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    availablity_status = table.Column<string>(unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarLists", x => x.vechicle_id);
                });

            migrationBuilder.CreateTable(
                name: "RentalAgreement",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    VechicleId = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    PersonName = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    Mobile = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    Adhar = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    Email = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    Duration = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    TotalCost = table.Column<string>(unicode: false, maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentalAgreement", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserLogin",
                columns: table => new
                {
                    Email = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    Password = table.Column<string>(unicode: false, maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "UserRegister",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    LastName = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    Email = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    Role = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
                    Password = table.Column<string>(unicode: false, maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRegister", x => x.UserId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarLists");

            migrationBuilder.DropTable(
                name: "RentalAgreement");

            migrationBuilder.DropTable(
                name: "UserLogin");

            migrationBuilder.DropTable(
                name: "UserRegister");
        }
    }
}
