using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CourseMate.Models
{
	/// <summary>
	/// Represents a weighted type of assignment in some class.
	/// e.g. Exams, Quizzes, Homeworks, etc.
	/// </summary>
	public class AssignmentTypeModel
	{
		/// <summary>
		/// Unique ID for this assignment type.
		/// </summary>
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public Guid AssignmentTypeId { get; set; }

		/// <summary>
		/// The course that this assignment type is a part of.
		/// </summary>
		[InverseProperty("AssignmentTypes")]
		public virtual CourseModel Course { get; set; }

		/// <summary>
		/// The name of this assignment type.
		/// e.g. Exam, Quiz, Homework, etc.
		/// </summary>
		public string Name { get; set; }

		/// <summary>
		/// How much this type of assignment is weighted in the final
		/// grade calculation.
		/// </summary>
		public double Weight { get; set; }

		/// <summary>
		/// Every assignment of this type.
		/// </summary>
		[InverseProperty("AssignmentType")]
		public virtual ICollection<AssignmentModel> Assignments { get; set; }

		/// <summary>
		/// Represents the number of lowest grade assignments that will be
		/// excluded from the total grade calculation
		/// </summary>
		public int DropLowestCount { get; set; }
	}
}