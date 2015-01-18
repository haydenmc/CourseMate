using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CourseMate.Models.ViewModels
{
	public class AssignmentViewModel
	{
		public Guid AssignmentId { get; set; }
		public string Name { get; set; }
		public DateTimeOffset TimeDue { get; set; }
		public bool IsCompleted { get; set; }
		public double PointsPossible { get; set; }
		public double? PointsEarned { get; set; }
	}
}