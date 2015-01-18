using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using CourseMate.Models;
using CourseMate.Models.BindingModels;
using System.Drawing;
using ColorMine.ColorSpaces;
using CourseMate.Models.ViewModels;

namespace CourseMate.Controllers
{
	[Authorize]
	[RoutePrefix("api/Courses")]
    public class CoursesController : ApiController
    {
		private ApplicationDbContext DbContext = new ApplicationDbContext();
		private ApplicationUserManager _userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

		[HttpGet]
		[Route("")]
		public IHttpActionResult GetCourses()
		{
			var userId = User.Identity.GetUserId();
			var courses = DbContext.Users.Where(u => u.Id == userId).FirstOrDefault().Courses.Select(c => c.ToViewModel());
			return Ok<IEnumerable<CourseViewModel>>(courses);
		}

		[HttpPost]
		[Route("")]
		public IHttpActionResult PostCourse(CourseBindingModel course)
		{
			var userId = User.Identity.GetUserId();
			Random rnd = new Random();
			var rgbColor = (new Hsv() { H = rnd.Next(0,360), S = 1.0, V = 0.85 }).ToRgb();
			var hexColor = "#" + ((int)rgbColor.R).ToString("X2")
				+ ((int)rgbColor.G).ToString("X2")
				+ ((int)rgbColor.B).ToString("X2");
			var newCourse = new CourseModel()
			{
				CourseId = Guid.NewGuid(),
				User = DbContext.Users.Where(u => u.Id == userId).FirstOrDefault(),
				CourseName = course.CourseName,
				CourseCode = course.CourseCode,
				ColorCode = hexColor,
				TimeCreated = DateTimeOffset.Now,
				AssignmentTypes = new List<AssignmentTypeModel>()
			};
			DbContext.Courses.Add(newCourse);
			DbContext.SaveChanges();
			return Ok<CourseViewModel>(newCourse.ToViewModel());
		}
    }
}
