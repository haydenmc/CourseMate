namespace CourseMate.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.TermModels",
                c => new
                    {
                        TermId = c.Guid(nullable: false, identity: true),
                        Name = c.String(),
                        TimeCreated = c.DateTimeOffset(nullable: false, precision: 7),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.TermId)
                .ForeignKey("dbo.AspNetUsers", t => t.User_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "dbo.CourseModels",
                c => new
                    {
                        CourseId = c.Guid(nullable: false, identity: true),
                        CourseCode = c.String(),
                        CourseName = c.String(),
                        TimeCreated = c.DateTimeOffset(nullable: false, precision: 7),
                        Term_TermId = c.Guid(),
                        ApplicationUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.CourseId)
                .ForeignKey("dbo.TermModels", t => t.Term_TermId)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id)
                .Index(t => t.Term_TermId)
                .Index(t => t.ApplicationUser_Id);
            
            CreateTable(
                "dbo.AssignmentTypeModels",
                c => new
                    {
                        AssignmentTypeId = c.Guid(nullable: false, identity: true),
                        Name = c.String(),
                        Weight = c.Double(nullable: false),
                        DropLowestCount = c.Int(nullable: false),
                        Course_CourseId = c.Guid(),
                        ApplicationUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.AssignmentTypeId)
                .ForeignKey("dbo.CourseModels", t => t.Course_CourseId)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id)
                .Index(t => t.Course_CourseId)
                .Index(t => t.ApplicationUser_Id);
            
            CreateTable(
                "dbo.AssignmentModels",
                c => new
                    {
                        AssignmentId = c.Guid(nullable: false, identity: true),
                        Name = c.String(),
                        AssignmentType_AssignmentTypeId = c.Guid(),
                        ApplicationUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.AssignmentId)
                .ForeignKey("dbo.AssignmentTypeModels", t => t.AssignmentType_AssignmentTypeId)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id)
                .Index(t => t.AssignmentType_AssignmentTypeId)
                .Index(t => t.ApplicationUser_Id);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TermModels", "User_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.CourseModels", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AssignmentTypeModels", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.AssignmentModels", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.CourseModels", "Term_TermId", "dbo.TermModels");
            DropForeignKey("dbo.AssignmentTypeModels", "Course_CourseId", "dbo.CourseModels");
            DropForeignKey("dbo.AssignmentModels", "AssignmentType_AssignmentTypeId", "dbo.AssignmentTypeModels");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.AssignmentModels", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.AssignmentModels", new[] { "AssignmentType_AssignmentTypeId" });
            DropIndex("dbo.AssignmentTypeModels", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.AssignmentTypeModels", new[] { "Course_CourseId" });
            DropIndex("dbo.CourseModels", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.CourseModels", new[] { "Term_TermId" });
            DropIndex("dbo.TermModels", new[] { "User_Id" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.AssignmentModels");
            DropTable("dbo.AssignmentTypeModels");
            DropTable("dbo.CourseModels");
            DropTable("dbo.TermModels");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetRoles");
        }
    }
}
