import customaxios from '../Axios/customaxios';

export const getCategoryData = async(access_token, setCategoryList) =>{
    await customaxios.get(`api/v1/universal/category`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    }).then((res) =>{
       const newOptions = res.data.map((item) => {
          return { value: item.id, label: item.category_name };
      });
      console.log(newOptions);
      setCategoryList(newOptions);
    }).catch((error) => {
        console.log(error);
    });    
}

export const doCastLoad = async(selectedCategory, setCastList)  => {
    if (selectedCategory) {
      console.log("Category selected, fetching casts...", selectedCategory)
      await customaxios.post(`api/v1/universal/casts/by-category/`,{        
        category_id: ""+selectedCategory
      }).then((res) =>{
        const newOptions = res.data.map((item) => {
            return { value: item.id, label: item.cast_name };
        });
        setCastList(newOptions);
      }).catch((error) => {
          console.log(error);
      });
    }
}


export const getProvinceData = async(setProvinceList) => {
    await customaxios.get(`api/v1/universal/province`,{
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then((res) =>{
        const newOptions = res.data.map((item) => {
            return { value: item.id, label: item.province_name };
        });
        setProvinceList(newOptions);
      }).catch((error) => {
          console.log(error);
      });
}

export const doCityLoad = async(selectedProvince, setCityList) => {
    if (selectedProvince) {
      console.log("Province selected, fetching cities...", selectedProvince)
      await customaxios.get(`api/v1/universal/city/province/${selectedProvince}`)
      .then((res) =>{
        const newOptions = res.data.map((item) => {
            return { value: item.id, label: item.city_name };
        });
        setCityList(newOptions);
      }).catch((error) => {
          console.log(error);
      });
    }
}


export const getMediumData = async(access_token, setMediumList) => {
    await customaxios.get(`api/v1/universal/medium`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
      }).then((res) =>{
        const newOptions = res.data.map((item) => {
            return { value: item.id, label: item.medium_name };
        });
        setMediumList(newOptions);
      }).catch((error) => {
          console.log(error);
      });
}

export const getBankData = async(access_token, setBankList) => {
    await customaxios.get(`api/v1/universal/bank`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
      }).then((res) =>{
        const newOptions = res.data.map((item) => {
            return { value: item.id, label: item.bank_name };
        });
        setBankList(newOptions);
      }).catch((error) => {
          console.log(error);
      });
}

export const getGradeData = async(access_token, branchid, setGradeList) => {
    await customaxios.get(`api/v1/admin/grade/branch/${branchid}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
      }).then((res) =>{
        const newOptions = res.data.map((item) => {
            return { value: item.id, label: item.grade_name };
        });
        setGradeList(newOptions);
      }).catch((error) => {
          console.log(error);
      });
}

export const getSectionData = async(access_token, branchid, setSectionList) => {
    await customaxios.get(`api/v1/admin/section/branch/${branchid}`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
      }).then((res) =>{
        const newOptions = res.data.map((item) => {
            return { value: item.id, label: item.section_name};
        });
        setSectionList(newOptions);
      }).catch((error) => {
          console.log(error);
      });
}

//Get Latest Academic Year
export const getSessionDetails = async (access_token) => {
    const branchid = localStorage.getItem('branch');
    await customaxios.get(`api/v1/admin/academicyear/csession/${branchid}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    }
  }).then((res) => {
    console.log(res.data);
    localStorage.setItem("sessionid",res.data.id);
    localStorage.setItem("sessionformat",res.data.session_displayformat);
  });
}
