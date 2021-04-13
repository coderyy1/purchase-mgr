import { defineComponent, ref, onMounted } from 'vue';
import * as Echarts from 'echarts'
import { result } from '@/helpers/utils';
import { home } from '@/network'

export default defineComponent({
  components: {

  },
  setup() {

    const totalDemand = ref(0)
    const totalSupplier = ref(0)
    const totalGoods = ref(0)


    // 初始化图表的方法
    const initEcharts = (el) => {
      return Echarts.init(el)
    }

    // 设置图表的方法
    const setEchartsOptions = (chart, option) => {
      chart.setOption(option)
    }

    // 获取各数据总数的方法
    const getTotal = async () => {
      const res = await home.total()
      result(res)
        .success(({data}) => {
          totalDemand.value = data.totalDemand
          totalSupplier.value = data.totalSupplier
          totalGoods.value = data.totalGoods
        })
    }

    // 获取需求完成情况的方法
    const getDemandFin = async (chart) => {
      const res = await home.demandFinish()
      result(res)
        .success(({data}) => {
          const option = {
            title: {
                text: '需求完成情况',
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                top: 'bottom'
            },
            series: [
                {
                    name: '需求完成情况',
                    type: 'pie',
                    radius: '80%',
                    data: [
                        {value: data.finished, name: '已完成'},
                        {value: data.unFinish, name: '未完成'},
                    ],
                    label: {
                      position: 'inside',
                      formatter: '{b}({d}%)'
                      },
                      labelLine: {
                          show: false
                      },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 4,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
          }

          setEchartsOptions(chart, option)
        })
    }

      // 获取用户情况的方法
      const getUserChara = async (chart) => {
        const res = await home.userChara()
        result(res)
          .success(({data}) => {
            const option = {
              title: {
                  text: '用户权限情况',
                  left: 'center'
              },
              tooltip: {
                  trigger: 'item'
              },
              legend: {
                  orient: 'vertical',
                  left: 'right',
                  top: 'bottom'
              },
              series: [
                  {
                      name: '用户权限情况',
                      type: 'pie',
                      radius: '80%',
                      data: [
                          {value: data.memberNum, name: '成员'},
                          {value: data.adminNum, name: '管理员'},
                          {value: data.buyerNum, name: '采购人员'},
                          {value: data.storemanNum, name: '仓库人员'},
                      ],
                      label: {
                        position: 'inside',
                        formatter: '{b}({d}%)'
                        },
                        labelLine: {
                            show: false
                        },
                      emphasis: {
                          itemStyle: {
                              shadowBlur: 4,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
            }
  
            setEchartsOptions(chart, option)
          })
      }





    onMounted( async () => {
      getTotal()
      const demandFin = initEcharts(document.getElementById('demand-finish'))
      await getDemandFin(demandFin)
      const userCha = initEcharts(document.getElementById('user-character'))
      await getUserChara(userCha)
    });

    return {
      totalDemand,
      totalSupplier,
      totalGoods
    }
  }
});