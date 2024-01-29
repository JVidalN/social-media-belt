import { yupResolver } from '@hookform/resolvers/yup'
import Alert from 'components/Alert'
import Heading1 from 'components/Heading1'
import Heading2 from 'components/Heading2'
import { deleteEntity, post } from 'lib/fetch'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useGet } from '../../../hooks/api'

const linkSchema = yup
  .object({
    name: yup.string().required(),
    publicName: yup.string().required(),
    slug: yup.string().required(),
    destination: yup.string().required(),
    appLink: yup.string().required(),
  })
  .required()

interface INewLinkForm {
  name: string
  publicName: string
  slug: string
  destination: string
  appLink: string
}

const links = () => {
  const router = useRouter()
  const { data, mutate } = useGet(`/api/${router?.query?.tenantId}/links`)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewLinkForm>({ resolver: yupResolver(linkSchema) })

  const submit: SubmitHandler<INewLinkForm> = async (inputs) => {
    console.log(inputs)
    const data = await post({
      url: `/api/${router?.query?.tenantId}/links`,
      data: inputs,
    })
    await mutate()
  }

  const deleteLink = async (id: string) => {
    console.log(id)
    const data = await deleteEntity({
      url: `/api/${router?.query?.tenantId}/links/${id}`,
    })
    await mutate()
  }

  return (
    <>
      <pre>{JSON.stringify(errors.name?.message, null, 2)}</pre>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <Heading1>Gerenciador de links</Heading1>
          <Heading2>Gerenciador de links</Heading2>
        </div>
        <div className="flex items-center">
          <button
            type="button"
            className="w-full rounded-l-md border-t border-b border-l bg-white px-4 py-2 text-base font-medium text-black hover:bg-gray-100"
          >
            Criar Link
          </button>
          <button
            type="button"
            className="w-full border bg-white px-4 py-2 text-base font-medium text-black hover:bg-gray-100"
          >
            Criar Grupo
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className="container mx-auto mt-4 max-w-2xl shadow-md md:w-3/4"
      >
        <div className="rounded-lg border-t-2 border-indigo-400 bg-gray-100/5 p-4 ">
          <div className="mx-auto max-w-sm md:mx-0 md:w-full">
            <div className="inline-flex items-center space-x-4">
              <Heading2>Criar link</Heading2>
            </div>
          </div>
        </div>
        <div className="space-y-6 bg-white">
          <div className="w-full items-center space-y-4 p-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="mx-auto max-w-sm md:w-1/3">Identificaçao</h2>
            <div className="mx-auto max-w-sm space-y-5 md:w-2/3">
              <div>
                <div className=" relative ">
                  <input
                    type="text"
                    className=" w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Nome interno"
                    {...register('name')}
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <input
                    type="text"
                    className=" w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Nome público"
                    {...register('publicName')}
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <input
                    type="text"
                    className=" w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Identificador (slug)"
                    {...register('slug')}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="w-full items-center space-y-4 p-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="mx-auto max-w-sm md:w-1/3">Destino</h2>
            <div className="mx-auto max-w-sm space-y-5 md:w-2/3">
              <div>
                <div className=" relative ">
                  <input
                    type="text"
                    className=" w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="https://"
                    {...register('destination')}
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <input
                    type="text"
                    className=" w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="TBD link interno para app"
                    {...register('appLink')}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="ml-auto w-full px-4 pb-4 text-gray-500 md:w-1/3">
            <button
              type="submit"
              className="w-full rounded-lg  bg-blue-600 py-2 px-4 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  focus:ring-offset-blue-200 "
            >
              Save
            </button>
          </div>
        </div>
      </form>

      {data?.links && data?.links?.length === 0 && (
        <Alert>Nenhum link cadastrado.</Alert>
      )}
      {data?.links && data?.links?.length > 0 && (
        <div className="container mx-auto max-w-3xl px-4 sm:px-8">
          <div className="py-8">
            <div className="mb-1 flex w-full flex-row justify-between sm:mb-0">
              <h2 className="text-2xl leading-tight text-white">Links</h2>
              <div className="text-end">
                <form className="flex w-3/4 max-w-sm flex-col justify-center space-y-3 md:w-full md:flex-row md:space-x-3 md:space-y-0">
                  <div className=" relative ">
                    <input
                      type="text"
                      id='"form-subscribe-Filter'
                      className=" w-full flex-1 appearance-none rounded-lg border border-transparent border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="name"
                    />
                  </div>
                  <button
                    className="flex-shrink-0 rounded-lg bg-purple-600 px-4 py-2 text-base font-semibold text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                    type="submit"
                  >
                    Filter
                  </button>
                </form>
              </div>
            </div>
            <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                      >
                        Created at
                      </th>
                      <th
                        scope="col"
                        className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                      >
                        status
                      </th>
                      <th
                        scope="col"
                        className="border-b border-gray-200 bg-white px-5 py-3 text-left text-sm font-normal uppercase text-gray-800"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.links &&
                      data?.links.map((link: any, idx: number) => {
                        return (
                          <tr key={idx}>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <div className="flex items-center">
                                <div className="ml-3">
                                  <p className="whitespace-no-wrap text-gray-900">
                                    {link.name}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap text-gray-900">
                                {link.publicName}
                              </p>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap text-gray-900">
                                {link.destination}
                              </p>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0 rounded-full bg-green-200 opacity-50"
                                ></span>
                                <span className="relative">active</span>
                              </span>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                              </a>
                              <button onClick={() => deleteLink(link.id)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
                <div className="xs:flex-row xs:justify-between flex flex-col items-center bg-white px-5 py-5">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="w-full rounded-l-xl border bg-white p-4 text-base text-gray-600 hover:bg-gray-100"
                    >
                      <svg
                        width={9}
                        fill="currentColor"
                        height={8}
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="w-full border-t border-b bg-white px-4 py-2 text-base text-indigo-500 hover:bg-gray-100 "
                    >
                      1
                    </button>
                    <button
                      type="button"
                      className="w-full border bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                    >
                      2
                    </button>
                    <button
                      type="button"
                      className="w-full border-t border-b bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                    >
                      3
                    </button>
                    <button
                      type="button"
                      className="w-full border bg-white px-4 py-2 text-base text-gray-600 hover:bg-gray-100"
                    >
                      4
                    </button>
                    <button
                      type="button"
                      className="w-full rounded-r-xl border-t border-b border-r bg-white p-4 text-base text-gray-600 hover:bg-gray-100"
                    >
                      <svg
                        width={9}
                        fill="currentColor"
                        height={8}
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default links
