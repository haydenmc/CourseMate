using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CourseMate.Models.ViewModels
{
	public class CourseViewModel
	{
		public Guid CourseId { get; set; }
		public string CourseCode { get; set; }
		public string CourseName { get; set; }
		public string ColorCode { get; set; }
		public DateTimeOffset TimeCreated { get; set; }
		public virtual ICollection<AssignmentTypeViewModel> AssignmentTypes { get; set; }
	}
}