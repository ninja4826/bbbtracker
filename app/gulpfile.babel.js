import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
// import runSeq from 'run-sequence';

gulp.task('clean', () => del('lib'));

gulp.task('build', ['clean'], () => {
	return gulp.src('src/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('lib'));
});

gulp.task('default', ['build']);