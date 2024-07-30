module.exports = function (grunt) {
    grunt.initConfig({
      prettier: {
        files: {
          src: ['src/**/*.{js,jsx,ts,tsx,json}'],
        },
      },
    });

    grunt.loadNpmTasks('grunt-prettier');
    grunt.registerTask('default', ['prettier']);
  };
