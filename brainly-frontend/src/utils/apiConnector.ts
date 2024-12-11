import axios from "axios"

const axiosInstance = axios.create({})

export const apiConnector = (method:string, url:string, bodyData?:object | undefined, headers?:object | undefined, params?:object| undefined)=>{
    // console.log(bodyData)
    return axiosInstance({
        method:method,
        url:url,
        data: bodyData ? bodyData : undefined,
        headers: headers ? headers : undefined,
        params: params ? params : undefined
    })
}