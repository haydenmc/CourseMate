using System.Web;
using System.Web.Optimization;

namespace CourseMate
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
			bundles.Add(new ScriptBundle("~/Bundles/JavaScript").Include(
				"~/Scripts/es6-promise-2.0.1.js"));

			bundles.Add(new ScriptBundle("~/Bundles/TypeScript").Include(
				"~/Scripts/TypeScript/Animator.js",
				"~/Scripts/TypeScript/Component.js",
				"~/Scripts/TypeScript/App.js",
				"~/Scripts/TypeScript/Data/JsonRequest.js",
				"~/Scripts/TypeScript/Data/DataSource.js",
				"~/Scripts/TypeScript/Components/SmallDialog.js",
				"~/Scripts/TypeScript/Components/LogInDialog.js",
				"~/Scripts/TypeScript/Components/RegisterDialog.js"));

            bundles.Add(new StyleBundle("~/Content/Bundles/Css").Include(
				"~/Content/Css/App.css"));
        }
    }
}
