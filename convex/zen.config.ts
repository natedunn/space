import { defineConvexZen } from "convex-zen";
import { systemAdminPlugin } from "convex-zen-system-admin";

export default defineConvexZen({
	tokenEncryptionSecretEnvVar: "CONVEX_ZEN_SECRET",
	emailProvider: {
		async sendVerificationEmail(to, code) {
			console.log("[convex-zen] verification code", { to, code });
		},
		async sendPasswordResetEmail(to, code) {
			console.log("[convex-zen] password reset code", { to, code });
		},
	},
	plugins: [
		systemAdminPlugin({
			defaultRole: "admin",
			adminRole: "admin",
		}),
	],
});
