/* global console */
'use strict';

module.exports = function(grunt) {
	// Dynamically loads all required grunt tasks
	require('matchdep').filterDev('grunt-*')
		.forEach(grunt.loadNpmTasks);
		
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		/**
		 * This task removes files or entire directories.
		 */
		clean: {
      options: {
        force: true
      },
      allFromPublic: [
        './content',
        './fonts',
        './images',
        './script',
        './style',
        './index.html'
      ]
		},

		/**
		 * Tasks to copy-over specific files to specific directories.
		 * This is usually the case if we copy something from ./resoure
		 * over to ./public.
		 */
		copy: {
      allFromPublic: {
        files: [{
          expand: true,
          cwd: './stab/public/',
          src: ['**/*'],
          dest: './'
        }]
      }
		},
    
    exec: {
      stabOptimized: {
				stdout: true,
				stderr: true,
        cwd: process.cwd() + '/stab',
				command: 'node_modules\\.bin\\grunt watch-all --optimize',
				callback: function(error, stdout, stderr) {
					if (error) {
						console.error(error);
						return;
					}
          
          console.log(stdout);
				}
      }
    },
    
    wait: {
      zeroDone: {
        options: {
          delay: 1,
          after: function() {
            console.log('>> Done with last action.');
          }
        }
      },
      pointFive: {
        options: { delay: 500 }
      },
      five: {
        options: { delay: 5000 }
      },
      
      random: {
        options: {
          delay: 10,
          after: function() {
            console.log('gamble');
            return Math.random() < 0.05 ? false : true;
          }
        }
      }
		},
    
    concurrent: {
			options: { logConcurrentOutput: true },

      all: {
        tasks: ['exec', 'watch']
      },
      initial: ['wait:five', 'clean', 'copy', 'wait:zeroDone']
    },
    
    watch: {
      all: {
        files: ['./stab/public/**/*.*'],
        tasks: ['wait:pointFive', 'clean', 'copy', 'wait:zeroDone']
      }
    }
	});
	
	grunt.registerTask('default', (function() {
		var tasks = [
      'concurrent'
		];
		
		return tasks;
	})());
};