function toCapitalizeFirstLetter(string) 
{
	return string ? string.charAt(0).toUpperCase() + string.slice(1) : "Null";
}

export default toCapitalizeFirstLetter;
