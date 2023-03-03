import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react'
import { Button, Form, Input } from 'antd'
import AddImage from './components/AddImage'
import AddSensors from './components/AddSensors'
import AddAssignedUserIds from './components/AddAssignedUserIds'
import AddAssinedUnitId from './components/AddAssignedUnitId'
import AddAssignedCompanyId from './components/AddAssignedCompanyId'
import { AssetFormProps } from '@/types/types'

const AssetForm = forwardRef(
  ({ onCancel, openNotificaiton, defaultValues }: AssetFormProps, ref) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      form.resetFields()
    }, [defaultValues, form])

    useImperativeHandle(ref, () => ({
      clearForm() {
        form.resetFields()
      },
    }))

    const handleOnFinish = (values: any) => {
      setLoading(true)
      let address = process.env.NEXT_PUBLIC_API_BASE_ADDR + 
        'assets/'
      let requestConfig = { method: 'POST', body: JSON.stringify(values) }

      if (!!defaultValues) {
        address += defaultValues.id
        requestConfig.method = 'PUT'
      }
      fetch(address, requestConfig)
        .then((res) => {
          openNotificaiton(res, requestConfig.method)
          onCancel()
        })
        .catch((err) => openNotificaiton(err, requestConfig.method))
        .finally(() => {
          setLoading(false)
          form.resetFields()
        })
    }

    return (
      <Form
        layout={'vertical'}
        form={form}
        initialValues={{ layout: 'vertical' }}
        onValuesChange={() => {}}
        onFinish={handleOnFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Image of Asset" name="image">
          <AddImage
            defaultValue={defaultValues?.image}
            setFormImageValue={(image: any) =>
              form.setFieldValue('image', image)
            }
          />
        </Form.Item>
        <Form.Item label="Model" name="model">
          <Input
            defaultValue={defaultValues?.model}
            disabled={!!defaultValues?.model}
            placeholder="motor, fan, dryer..."
          />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input
            defaultValue={defaultValues?.name}
            placeholder="Motor H13D-1"
          />
        </Form.Item>
        <Form.Item label="Sensors" name="sensors">
          <AddSensors
            defaultValue={defaultValues?.sensors}
            setFormSensorsValue={(sensors: string[]) =>
              form.setFieldValue('sensors', sensors)
            }
          />
        </Form.Item>
        <Form.Item label="Assigned Users" name="assignedusersids">
          <AddAssignedUserIds
            defaultValue={defaultValues?.assignedUserIds}
            setFormUserIdsValue={(unitId: number[]) =>
              form.setFieldValue('assignedusersids', unitId)
            }
          />
        </Form.Item>
        <Form.Item label="Assigned Unit" name="assignedunitid">
          <AddAssinedUnitId
            defaultValue={defaultValues?.unitId}
            setFormUnitIdValue={(unitId: number) =>
              form.setFieldValue('assignedunitid', unitId)
            }
          />
        </Form.Item>
        <Form.Item label="Assigned Company" name="assignedcompanyid">
          <AddAssignedCompanyId
            defaultValue={defaultValues?.companyId}
            setFormCompanyIdValue={(companyId: number) =>
              form.setFieldValue('assignedcompanyid', companyId)
            }
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={onCancel}>Cancel</Button>
          <Button style={{ float: 'right' }} type="primary" htmlType="submit">
            Add Asset!
          </Button>
        </Form.Item>
      </Form>
    )
  }
)

AssetForm.displayName = 'AssetForm'

export default AssetForm
