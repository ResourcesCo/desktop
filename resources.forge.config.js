module.exports = {
  packagerConfig: {
    osxSign: {
      'hardened-runtime': true,
      hardenedRuntime: true,
      'gatekeeper-assess': false,
      entitlements: './resources/entitlements.mac.plist',
      'entitlements-inherit': './resources/entitlements.mac.plist',
    },
    osxNotarize: {
      appBundleId: 'com.benatkin.ResourcesAlpha',
      appPath: './out/Resources-darwin-x64/Resources.app',
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_ID_PASSWORD,
    },
    appBundleId: 'com.benatkin.ResourcesAlpha',
    appCategoryType: 'public.app-category.developer-tools',
    icon: 'resources/icon',
    ignore: 'packages/desktop-bundle',
  },
}
