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
	/// This represents an assignment a user adds. 
	/// It falls under a course, and an assignment type.
	/// </summary>
	public class AssignmentModel
	{
		/// <summary>
		/// Unique ID for this assignment.
		/// </summary>
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public Guid AssignmentId { get; set; }

		/// <summary>
		/// The type of this assignment.
		/// </summary>
		[InverseProperty("Assignments")]
		public virtual AssignmentTypeModel AssignmentType { get; set; }

		/// <summary>
		/// The name of this assignment.
		/// e.g. Midterm Exam, Homework 1, etc.
		/// </summary>
		public string Name { get; set; }

		public DateTimeOffset TimeDue { get; set; }

		public bool IsCompleted { get; set; }

		public double PointsPossible { get; set; }

		public double? PointsEarned { get; set; }

		public AssignmentViewModel ToViewModel()
		{
			return new AssignmentViewModel()
			{
				AssignmentId = this.AssignmentId,
				Name = this.Name,
				PointsPossible = this.PointsPossible,
				PointsEarned = this.PointsEarned,
				IsCompleted = this.IsCompleted,
				TimeDue = this.TimeDue
			};
		}
	}
}