import React, { useState } from 'react'
import useShowToast from './useShowToast';

export const useImagePreview = () => {


    const [imageUrl,setImageUrl] = useState(null);
    const showToast = useShowToast();


    const handleImageChange = (e) =>{
        const file = e.target.files[0];

        if(file && file.type.startsWith("image/")){
            const reader = new FileReader();


            reader.onloadend = () =>{
                setImageUrl(reader.result);

            };
            reader.onerror = () => {
                showToast("Error", "Failed to read the image file", "error");
            };
            reader.readAsDataURL(file);
        }
        else{
            showToast("Invalid image format","Please upload image file" ,"warning")
            setImageUrl(null)
        }
    };

  return {handleImageChange,imageUrl}
}
