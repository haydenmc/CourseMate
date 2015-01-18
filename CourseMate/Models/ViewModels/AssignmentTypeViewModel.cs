using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CourseMate.Models.ViewModels
{
	public class AssignmentTypeViewModel
	{
		public Guid AssignmentTypeId { get; set; }
		public string Name { get; set; }
		public double Weight { get; set; }
		public virtual ICollection<AssignmentViewModel> Assignments { get; set; }
		public int DropLowestCount { get; set; }
	}
}