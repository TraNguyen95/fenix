export const commonMessage = {
  required: 'This is required field',
  minlength: 'This is the minimum number of required',
  maxlength: 'This is the maximum number of required',
  minOne: 'Minimum number of required is 1'
}
export const getRules = () => ({
  RequiredCoins: {
    required: {
      value: true,
      message: commonMessage.required
    },
    maxLength: {
      value: 10,
      message: commonMessage.maxlength
    },
    minLength: {
      value: 1,
      message: commonMessage.minlength
    }
  },
  RequiredCoinsItem: {
    required: {
      value: true,
      message: commonMessage.required
    }
  },
  mainDuration: {
    validate: validateNumberRange(1)
  },
  roundNo: {
    validate: validateNumberRange(1, 5)
  },
  preparationTimeBeforeMatch: {
    validate: validateNumberRange(1, 50)
  },
  timeRemaining: {
    validate: validateNumberRange(1, 20)
  },
  position: {
    validate: validateNumberRange(1)
  },
  roundName: {
    required: {
      value: true,
      message: commonMessage.required
    },
    maxLength: {
      value: 20,
      message: commonMessage.maxlength
    },
    minLength: {
      value: 1,
      message: commonMessage.minlength
    }
  },
  season: {
    required: {
      value: true,
      message: commonMessage.required
    },
    maxLength: {
      value: 100,
      message: commonMessage.maxlength
    }
  },
  numberOfMedal: {
    required: {
      value: true,
      message: commonMessage.required
    }
  },
  tierWeight: {
    validate: validateNumberRange(1, 100)
  },
  timeToUpRange: {
    validate: validateNumberRange(1)
  },
  costToBuyQuantity: {
    validate: validateNumberRange(1, 50)
  },
  email: {
    required: {
      value: true,
      message: 'Email là bắt buộc'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 5 - 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Độ dài từ 5 - 160 ký tự'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Nhập lại password là bắt buộc'
    },
    maxLength: {
      value: 160,
      message: 'Độ dài từ 6 - 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Độ dài từ 6 - 160 ký tự'
    }
  },
  week: {
    validate: validateNumberRange(1)
  }
})

const validateNumberRange = (min: number, max?: number) => (value: any) => {
  const number = parseInt(value)
  if (isNaN(number)) {
    return 'Please enter a number'
  }
  console.log(max)
  if (!max && value < min) {
    return `Enter a number > ${min}`
  } else if (number < min || number > (max as number)) {
    return `Enter a number between ${min} and ${max}`
  }
  return true
}
