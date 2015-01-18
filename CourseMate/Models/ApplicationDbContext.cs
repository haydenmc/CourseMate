using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CourseMate.Models
{
	public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
	{
		//public DbSet<TermModel> Terms { get; set; }
		public DbSet<CourseModel> Courses { get; set; }
		public DbSet<AssignmentTypeModel> AssignmentTypes { get; set; }
		public DbSet<AssignmentModel> Assignments { get; set; }

		public ApplicationDbContext()
			: base("DefaultConnection", throwIfV1Schema: false)
		{
		}

		public static ApplicationDbContext Create()
		{
			return new ApplicationDbContext();
		}
	}
}