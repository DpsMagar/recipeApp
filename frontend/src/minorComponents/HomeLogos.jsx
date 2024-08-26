import React from 'react'
import fb from "../Images/facebook.png"
import git from "../Images/github.png"
import insta from "../Images/insta.png"
function HomeLogos() {
        return (<>
        
<div className='mainLogo '>
    <div><p className='text-white font-bold'>About user</p></div>
        <div className='flex gap-2 my-2'>
          <a  href="https://www.facebook.com/dipesh.paharaimagar/">
             <img className='homeLogo' src={fb} alt="facebook" /></a>
             <a  href="https://github.com/DpsMagar">
             <img className='homeLogo' src={git} alt="github" /></a>
             <a  href="https://www.instagram.com/dipeshdajuu/">
            <img className='homeLogo' src={insta} alt="insta" /></a>
        </div>
</div>
        </>
  )
}

export default HomeLogos
