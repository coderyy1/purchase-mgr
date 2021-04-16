import { defineComponent, ref } from 'vue'
import axios from 'axios'
import store from '@/store'
import { setToken ,getToken } from '@/helpers/token/index'
import { message } from 'ant-design-vue'


export default defineComponent({
  name: 'UploadImg',
  setup() {

    const inputEl = ref()
    const imgSrc = ref(store.state.userAvatSrc)

    const userId = store.state.userInfo._id


    // 模拟点击
    const handleClick = () => {
      inputEl.value.click()
    }

    // 预览
    const previewImg = () => {
      if(!inputEl.value.files[0]) {
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        imgSrc.value = e.target.result
      }
      reader.readAsDataURL(inputEl.value.files[0])
    }

    // 上传图片
    const uploadClick = () => {
      if(!inputEl.value.files[0]) {
        message.error('请选择一张图片')
        return
      }
      const file = inputEl.value.files[0]
      let form = new FormData()
      form.append('file', file)
      form.append('userId', userId)
      const config = {
        headers: {
          'Content-Type':'multipart/form-data',
          'Authorization': `Bearer ${getToken()}`
        }
      }
      axios.post('http://localhost:3000/upload/userAvat',form,config)
        .then( async ({data}) => {
          // imgSrc.value = data.path
          store.dispatch('getuserAvatSrc')
          // 更新状态
          inputEl.value.value = ''
          message.success('上传成功')
        })
    }

    return {
      inputEl,
      imgSrc,
      userId,

      handleClick,
      previewImg,
      uploadClick
    }
  }
})