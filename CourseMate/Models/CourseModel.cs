using CourseMate.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CourseMate.Models
{
	/// <summary>
	/// This class keeps track of each course a user enters.
	/// </summary>
	public class CourseModel
	{
		/// <summary>
		/// Unique ID for this course.
		/// </summary>
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public Guid CourseId { get; set; }

		/// <summary>
		/// Term that this course belongs to.
		/// </summary>
		[InverseProperty("Courses")]
		public virtual ApplicationUser User { get; set; }

		/// <summary>
		/// Short code for referencing this class.
		/// E.g. CS250
		/// </summary>
		public string CourseCode { get; set; }

		/// <summary>
		/// Full course name.
		/// E.g. Foundations of Computer Science
		/// </summary>
		public string CourseName { get; set; }

		/// <summary>
		/// Defines the color that will be used to identify this course.
		/// E.g. #ffffff
		/// </summary>
		public string ColorCode { get; set; }

		/// <summary>
		/// Date and time this course was entered.
		/// </summary>
		public DateTimeOffset TimeCreated { get; set; }

		/// <summary>
		/// List of assignment types in this couse.
		/// </summary>
		[InverseProperty("Course")]
		public virtual ICollection<AssignmentTypeModel> AssignmentTypes { get; set; }

		public CourseViewModel ToViewModel()
		{
			return new CourseViewModel()
			{
				CourseId = this.CourseId,
				CourseName = this.CourseName,
				CourseCode = this.CourseCode,
				ColorCode = this.ColorCode,
				TimeCreated = this.TimeCreated,
				AssignmentTypes = this.AssignmentTypes.Select(a => a.ToViewModel()).ToList()
			};
		}
	}
}