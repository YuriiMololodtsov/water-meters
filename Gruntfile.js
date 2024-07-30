module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    prettier: {
      files: {
        src: ['src/**/*.{js,jsx,ts,tsx,json}'],
      },
    },

    'gh-pages': {
      options: {
        base: 'build',
      },
      src: ['**/*']
    }
  });

  grunt.loadNpmTasks('grunt-prettier');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('default', ['prettier']);

  grunt.registerTask('build', ['prettier']);

  grunt.registerTask('deploy', ['build', 'gh-pages']);
};
