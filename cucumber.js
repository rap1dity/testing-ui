module.exports = {
  default: {
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    require: ['src/steps/**/*.ts'],
    format: ['progress-bar', 'html:cucumber-report.html'],
    headless: process.env.HEADLESS === 'true',
    paths: ['src/features/**/*.feature'],
  }
}
