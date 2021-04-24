import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Slider',
  props: {
    // 成功之后的函数
    successFun: {
        type: Function
    },
    //成功图标
    successIcon: {
        type: String,
        default: '√'
    },
    //成功文字
    successText: {
        type: String,
        default: '验证成功'
    },
    //开始的图标
    startIcon: {
        type: String,
        default: '→'
    },
    //开始的文字
    startText: {
        type: String,
        default: '请拖住滑块，拖动到最右边'
    },
    //失败之后的函数
    errorFun: {
        type: Function
    },
    //或者用值来进行监听
    status: {
        type: String
    }
  },
  setup(props, ctx) {
    const disX = ref(0)
    const rangeStatus = ref(false)
    const lbg = ref()

    

    //滑块移动
    const rangeMove = (e) => {
      let ele = e.target;
      let startX = e.clientX;
      let eleWidth = ele.offsetWidth;
      let parentWidth =  ele.parentElement.offsetWidth;
      let MaxX = parentWidth - eleWidth;
      if(rangeStatus.value){
        //不运行
        return false;
    }
    document.onmousemove = (e) => {
        let endX = e.clientX;
        disX.value = endX - startX;
        if(disX.value<=0){
          disX.value = 0;
        }
        if(disX.value>=MaxX-eleWidth){
          //减去滑块的宽度,体验效果更好
          disX.value = MaxX;
        }
        
        ele.style.transition = '.1s all';
        ele.style.transform = 'translateX('+disX.value+'px)';
        lbg.value.style.transition = '.1s all';
        lbg.value.style.transform = 'translateX('+disX.value+'px)';
        // lbg.value.style.width = `${disX.value}px`;
        e.preventDefault();
      }
      document.onmouseup = ()=> {
          if(disX.value !== MaxX){
              lbg.value.style.transition = '.5s all';
              lbg.value.style.transform = 'translateX(0)';
              ele.style.transition = '.5s all';
              ele.style.transform = 'translateX(0)';
              //执行成功的函数
              props.errorFun && props.errorFun();
            }else{
              rangeStatus.value = true;
              if(props.status){
                  ctx.parent[props.status] = true;
              }
              //执行成功的函数
              props.successFun && props.successFun();
            }
            document.onmousemove = null;
            document.onmouseup = null;
          }
    }


    return {
      disX,
      rangeStatus,
      lbg,
      successIcon: props.successIcon,
      startIcon: props.startIcon,
      successText: props.successText,
      startText: props.startText,

      rangeMove
    }
  }
});