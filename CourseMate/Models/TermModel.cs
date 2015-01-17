using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CourseMate.Models
{
	/// <summary>
	/// Represents a term of study.
	/// </summary>
	public class TermModel
	{
		/// <summary>
		/// Unique ID for this term.
		/// </summary>
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public Guid TermId { get; set; }

		/// <summary>
		/// The user that this term belongs to.
		/// </summary>
		[InverseProperty("Terms")]
		public virtual ApplicationUser User { get; set; }

		/// <summary>
		/// The name of this term.
		/// e.g. Spring 2015
		/// </summary>
		public string Name { get; set; }

		/// <summary>
		/// Date and time this term was created.
		/// </summary>
		public DateTimeOffset TimeCreated { get; set; }

		/// <summary>
		/// List of courses that are in this term.
		/// </summary>
		[InverseProperty("Term")]
		public ICollection<CourseModel> Courses { get; set; }
	}
}