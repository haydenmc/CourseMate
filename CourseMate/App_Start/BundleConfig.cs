﻿using System.Web;
using System.Web.Optimization;

namespace CourseMate
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
			//bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
			//		  "~/Scripts/bootstrap.js",
			//		  "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/css/App.css"));
        }
    }
}