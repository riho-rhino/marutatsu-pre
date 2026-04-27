// gulpfile-runner.mjs
import gulp from 'gulp'
import { start, build } from './gulpfile.mjs'

const mode = process.env.npm_lifecycle_event
const task = mode === 'build' ? build : start

gulp.series(task)((err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
})