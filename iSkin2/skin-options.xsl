<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="xml" omit-xml-declaration="yes" />

<!-- The URL for invoking the NMT Controller -->
<xsl:variable name="skin-nmtList">Family Room:192.168.1.112:2,Bonus Room:192.168.1.11:2</xsl:variable>
<xsl:variable name="skin-urlMap">smb://MINI/Mounts/=http://192.168.1.10/</xsl:variable>
<xsl:variable name="skin-proxy"></xsl:variable>
	
<!-- The URL the NMT will load when a video stops playing, Series 1 only -->	
<xsl:variable name="skin-doneURL">file:///share/index.htm</xsl:variable>

</xsl:stylesheet>
