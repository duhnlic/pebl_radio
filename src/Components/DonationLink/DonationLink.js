
export default function DonationLink() {
 return(
    <button className="donate-button" onClick={()=>{window.open('https://www.paypal.com/paypalme/bpstew');}}>
        DONATE
    </button>
 )
}
