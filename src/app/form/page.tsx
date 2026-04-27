'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMemoizedFn } from 'ahooks'
import cc from 'classcat'
import {
  FormProvider,
  type SubmitHandler,
  useFieldArray,
  useForm,
  useFormContext,
  useFormState,
} from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/retroui/Button'
import { Input } from '@/components/retroui/Input'
import { flatMap } from '@/utils'

import styles from './index.module.scss'

const UserSchema = z.object({
  age: z
    .number('年龄必须输入数字')
    .min(3, '年龄必须大于3')
    .max(120, '年龄必须小于120'),
  name: z.string().min(1, '输入姓名'),
  get children() {
    return z.array(UserSchema).nullish()
  },
})

const FormDataSchema = z.object({
  items: z
    .array(UserSchema)
    .min(1, '至少添加一个用户')
    .max(5, '最多添加五个用户'),
})

type FormData = z.infer<typeof FormDataSchema>

export default function FormExample() {
  const methods = useForm({
    resolver: zodResolver(FormDataSchema),
    mode: 'onChange',
    defaultValues: { items: [] },
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  const onSubmit: SubmitHandler<FormData> = useMemoizedFn(data =>
    console.log(data),
  )

  const { fields, remove, append } = useFieldArray({
    name: 'items' as keyof FormData,
    control,
  })

  return (
    <FormProvider {...methods}>
      <form
        className={cc([styles.form, 'flex flex-col gap-2'])}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        {fields.map((field, index) => (
          <User
            key={field.id}
            name={`items.${index}`}
            onRemove={() => remove(index)}
          />
        ))}
        {flatMap(
          errors.items?.message || errors.items?.root?.message,
          e => e,
        )(e => <span role="danger">{e}</span>).run()}
        <Button
          variant="secondary"
          type="button"
          onClick={() => append({ age: 10, name: '' })}
        >
          +
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  )
}

type UserProps = {
  onRemove: () => void
  name: string
  level?: number
}

export function User({ level = 0, name, onRemove }: UserProps) {
  const { register, control, getFieldState } = useFormContext<FormData>()

  const formState = useFormState({
    control,
    name: name as keyof FormData,
  })

  const { error: nameError } = getFieldState(
    `${name}.name` as keyof FormData,
    formState,
  )

  const { error: ageError } = getFieldState(
    `${name}.age` as keyof FormData,
    formState,
  )

  const { fields, remove, append } = useFieldArray({
    name: (name + '.children') as keyof FormData,
    control,
  })

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-4" style={{ marginLeft: level * 20 }}>
        <Input {...register(`${name}.name` as keyof FormData)} />
        <Input
          type="number"
          {...register(`${name}.age` as keyof FormData, {
            valueAsNumber: true,
          })}
        />
        {(!fields || fields.length <= 0) && (
          <Button variant="outline" type="button" onClick={onRemove}>
            -
          </Button>
        )}
        <Button
          variant="outline"
          type="button"
          onClick={() => append({ age: 10, name: '' })}
        >
          +
        </Button>
      </div>
      <div style={{ marginLeft: level * 20 }}>
        {nameError?.message && <span role="danger">{nameError.message}</span>}
        {ageError?.message && <span role="danger">{ageError.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <User
            key={field.id}
            name={`${name}.children.${index}`}
            level={level + 1}
            onRemove={() => remove(index)}
          />
        ))}
      </div>
    </div>
  )
}
