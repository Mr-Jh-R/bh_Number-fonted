// @ts-ignore
/* eslint-disable */
import request from '@/request'

/** deleteProduct POST /api/product/delete */
export async function deleteProductUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/product/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** editProduct POST /api/product/edit */
export async function editProductUsingPost(
  body: API.ProductEditRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/product/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** getProductById GET /api/product/get */
export async function getProductByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseProduct_>('/api/product/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** getProductVOById GET /api/product/get/vo */
export async function getProductVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductVOByIdUsingGETParams,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseProductVO_>('/api/product/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  })
}

/** listProductByPage POST /api/product/list/page */
export async function listProductByPageUsingPost(
  body: API.ProductQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageProduct_>('/api/product/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** listProductVOByPage POST /api/product/list/page/vo */
export async function listProductVoByPageUsingPost(
  body: API.ProductQueryRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponsePageProductVO_>('/api/product/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** listProductTagCategory GET /api/product/tag_category */
export async function listProductTagCategoryUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponsePictureTagCategory_>('/api/product/tag_category', {
    method: 'GET',
    ...(options || {}),
  })
}

/** updateProduct POST /api/product/update */
export async function updateProductUsingPost(
  body: API.ProductUpdateRequest,
  options?: { [key: string]: any }
) {
  return request<API.BaseResponseBoolean_>('/api/product/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}

/** uploadProduct POST /api/product/upload */
export async function uploadProductUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.uploadProductUsingPOSTParams,
  body: {},
  file?: File,
  options?: { [key: string]: any }
) {
  const formData = new FormData()

  if (file) {
    formData.append('file', file)
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele]

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''))
        } else {
          formData.append(ele, JSON.stringify(item))
        }
      } else {
        formData.append(ele, item)
      }
    }
  })

  return request<API.BaseResponseProductVO_>('/api/product/upload', {
    method: 'POST',
    params: {
      ...params,
    },
    data: formData,
    requestType: 'form',
    ...(options || {}),
  })
}
