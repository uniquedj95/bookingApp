import useAuth from "../composables/useAuth";

export default new class ApiClient {

  private getHeaders () {
    const { isAuthenticated, token } = useAuth();
    const headers: HeadersInit = {}
    if(isAuthenticated.value)  headers["Authorization"] = token.value;
    return headers;
  }
   
  private async exeFetch(url: string, opts?: RequestInit) {
    try {
      const res = await fetch(url, {
        mode: "no-cors",
        headers: this.getHeaders(),
        ...opts
      });

      if([200, 201].includes(res.status)) {
        console.log(res, await res.json());
        return await res.json();
      }
      throw new Error("API Server error occured!");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  postJson (url: string, data?: Record<string, any>) {
    return this.exeFetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  getJson (url: string) {
    return this.exeFetch(url);
  }
}