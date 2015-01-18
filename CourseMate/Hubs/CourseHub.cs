using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace CourseMate.Hubs
{
	public class CourseHub : Hub
	{
		public void Hello()
		{
			Clients.All.hello();
		}
	}
}