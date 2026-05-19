import { type TreeProps } from 'antd'
import { useState } from 'react'

export default function useTreeData() {
  const [treeData] = useState<NonNullable<TreeProps['treeData']>>([
    {
      title: '国泰海通固定收益委员会',
      key: '1',
      children: [
        {
          title: '固定收益客需部',
          key: '1-1',
        },
        {
          title: '固定收益投资部',
          key: '1-2',
          children: [
            {
              title: '债券投资业务',
              key: '1-2-1',
              children: [
                {
                  title: '固收自营_配置性债券投资',
                  key: '1-2-1-1',
                },
                {
                  title: '配置型债券投资_可供出售',
                  key: '1-2-1-2',
                },
                {
                  title: '信用投资组',
                  key: '1-2-1-3',
                },
                {
                  title: '利率投资组',
                  key: '1-2-1-4',
                },
                {
                  title: '结构化及混合产品组',
                  key: '1-2-1-5',
                },
                {
                  title: '做市组',
                  key: '1-2-1-6',
                },
              ],
            },
          ],
        },
      ],
    },
  ])

  return treeData
}
