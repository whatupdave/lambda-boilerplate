import {handler} from '../'

const [_, __, arg1] = process.argv

handler({
  arg1: arg1,
}, {
  done: (result, error) => {
    if (error) {
      console.error(error)
      process.exit(1)
    }

    console.log(result)
    process.exit(0)
  },

  succeed: result => {
    console.log(result)
  },

  fail: error => {
    console.error(error)
  },
})
