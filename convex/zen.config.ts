import { defineConvexZen } from "convex-zen";
import { systemAdminPlugin } from "convex-zen/plugins/system-admin";

export default defineConvexZen({
	plugins: [
		systemAdminPlugin({
			defaultRole: "user",
			adminRole: "admin",
		}),
	],
});
