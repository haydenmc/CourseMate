namespace CourseMate.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Refined : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.CourseModels", "Term_TermId", "dbo.TermModels");
            DropForeignKey("dbo.AssignmentModels", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AssignmentTypeModels", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.TermModels", "User_Id", "dbo.AspNetUsers");
            DropIndex("dbo.TermModels", new[] { "User_Id" });
            DropIndex("dbo.CourseModels", new[] { "Term_TermId" });
            DropIndex("dbo.AssignmentTypeModels", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.AssignmentModels", new[] { "ApplicationUser_Id" });
            RenameColumn(table: "dbo.CourseModels", name: "ApplicationUser_Id", newName: "User_Id");
            RenameIndex(table: "dbo.CourseModels", name: "IX_ApplicationUser_Id", newName: "IX_User_Id");
            AddColumn("dbo.CourseModels", "ColorCode", c => c.String());
            AddColumn("dbo.AssignmentModels", "TimeDue", c => c.DateTimeOffset(nullable: false, precision: 7));
            AddColumn("dbo.AssignmentModels", "IsCompleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.AssignmentModels", "PointsPossible", c => c.Double(nullable: false));
            AddColumn("dbo.AssignmentModels", "PointsEarned", c => c.Double());
            DropColumn("dbo.CourseModels", "Term_TermId");
            DropColumn("dbo.AssignmentTypeModels", "ApplicationUser_Id");
            DropColumn("dbo.AssignmentModels", "ApplicationUser_Id");
            DropTable("dbo.TermModels");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.TermModels",
                c => new
                    {
                        TermId = c.Guid(nullable: false, identity: true),
                        Name = c.String(),
                        TimeCreated = c.DateTimeOffset(nullable: false, precision: 7),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.TermId);
            
            AddColumn("dbo.AssignmentModels", "ApplicationUser_Id", c => c.String(maxLength: 128));
            AddColumn("dbo.AssignmentTypeModels", "ApplicationUser_Id", c => c.String(maxLength: 128));
            AddColumn("dbo.CourseModels", "Term_TermId", c => c.Guid());
            DropColumn("dbo.AssignmentModels", "PointsEarned");
            DropColumn("dbo.AssignmentModels", "PointsPossible");
            DropColumn("dbo.AssignmentModels", "IsCompleted");
            DropColumn("dbo.AssignmentModels", "TimeDue");
            DropColumn("dbo.CourseModels", "ColorCode");
            RenameIndex(table: "dbo.CourseModels", name: "IX_User_Id", newName: "IX_ApplicationUser_Id");
            RenameColumn(table: "dbo.CourseModels", name: "User_Id", newName: "ApplicationUser_Id");
            CreateIndex("dbo.AssignmentModels", "ApplicationUser_Id");
            CreateIndex("dbo.AssignmentTypeModels", "ApplicationUser_Id");
            CreateIndex("dbo.CourseModels", "Term_TermId");
            CreateIndex("dbo.TermModels", "User_Id");
            AddForeignKey("dbo.TermModels", "User_Id", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.AssignmentTypeModels", "ApplicationUser_Id", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.AssignmentModels", "ApplicationUser_Id", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.CourseModels", "Term_TermId", "dbo.TermModels", "TermId");
        }
    }
}
