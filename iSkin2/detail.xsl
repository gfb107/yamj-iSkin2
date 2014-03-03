<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text" name="text"/>
<xsl:include href="preferences.xsl"/>
<xsl:include href="skin-options.xsl"/>
<xsl:template name="string-replace-all">
    <xsl:param name="text" />
    <xsl:param name="replace" />
    <xsl:param name="by" />
    <xsl:choose>
        <xsl:when test="contains($text, $replace)">
            <xsl:value-of select="substring-before($text,$replace)" />
            <xsl:value-of select="$by" />
            <xsl:call-template name="string-replace-all">
                <xsl:with-param name="text"
                    select="substring-after($text,$replace)" />
                <xsl:with-param name="replace" select="$replace" />
                <xsl:with-param name="by" select="$by" />
            </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
            <xsl:value-of select="$text" />
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>
<xsl:template name="fixText">
  <xsl:param name="text"/>
    <!-- Replace quotes -->
    <xsl:variable name="myVar">
        <xsl:call-template name="string-replace-all">
            <xsl:with-param name="text" select="$text" />
            <xsl:with-param name="replace" select="'&quot;'" />
            <xsl:with-param name="by"><xsl:text>\"</xsl:text></xsl:with-param>
        </xsl:call-template>
    </xsl:variable>

    <!-- Replace newlines -->
    <xsl:variable name="myVar">
        <xsl:call-template name="string-replace-all">
            <xsl:with-param name="text" select="$myVar" />
            <xsl:with-param name="replace" select="'&#xA;'" />
            <xsl:with-param name="by">&lt;br/&gt;</xsl:with-param>
        </xsl:call-template>
    </xsl:variable>
	
	<xsl:value-of select="$myVar" />
</xsl:template>

<xsl:template name="cleanFlag"><xsl:param name="flag" /><xsl:value-of select="lower-case(translate(tokenize($flag,'[ /]')[1],'-',''))" /></xsl:template>

<xsl:template name="genCertStyle"><xsl:param name="cert" /></xsl:template>

<xsl:template match="/details/movie">{
	"id": {<xsl:for-each select="id">
		"<xsl:value-of select="@moviedb" />": "<xsl:value-of select="." />"<xsl:if test="position()!=last()">,</xsl:if></xsl:for-each>
	},
	"title": "<xsl:call-template name="fixText"><xsl:with-param name="text" select="title" /></xsl:call-template><xsl:choose><xsl:when test="season &gt; 0"> Season <xsl:value-of select="season" /></xsl:when><xsl:when test="season = 0"> Specials</xsl:when></xsl:choose>"
	<xsl:if test="count(files/file)!=0">, "files": [<xsl:for-each select="files/file"><xsl:apply-templates select="."/><xsl:if test="position()!=last()">,</xsl:if></xsl:for-each> ]</xsl:if>
    <xsl:if test="year!='UNKNOWN'">, "year": <xsl:value-of select="year" /></xsl:if>
    <xsl:if test="runtime!='UNKNOWN'">, "runtime": "<xsl:value-of select="runtime" />"</xsl:if>
    <xsl:if test="certification!='UNKNOWN'">, "cert": "<xsl:call-template name="cleanFlag"><xsl:with-param name="flag" select="certification"/></xsl:call-template>"</xsl:if>
    <xsl:if test="rating!='UNKNOWN'">, "rating": <xsl:value-of select="rating" /></xsl:if>
    <xsl:if test="detailPosterFile!='UNKNOWN'">, "poster": "<xsl:value-of select="detailPosterFile" />"</xsl:if>
	<xsl:if test="fanartFile!='UNKNOWN'">, "fanart": "<xsl:value-of select="fanartFile" />"</xsl:if>
    <xsl:if test="plot!='UNKNOWN'">, "plot": "<xsl:call-template name="fixText"><xsl:with-param name="text" select="plot" /></xsl:call-template>"</xsl:if>
    <xsl:if test="plot='UNKNOWN'">, "plot": "<xsl:call-template name="fixText"><xsl:with-param name="text" select="outline" /></xsl:call-template>"</xsl:if>
	<xsl:if test="container!='UNKNOWN'">, "container": "<xsl:call-template name="cleanFlag"><xsl:with-param name="flag" select="container"/></xsl:call-template>"</xsl:if>
	<xsl:if test="videoCodec!='UNKNOWN'">, "videoCodec": "<xsl:call-template name="cleanFlag"><xsl:with-param name="flag" select="videoCodec"/></xsl:call-template>"</xsl:if>
	<xsl:if test="resolution!='UNKNOWN'">, "resolution": "<xsl:value-of select="resolution"/>"</xsl:if>
	<xsl:if test="audioCodec!='UNKNOWN'">, "audioCodec": "<xsl:call-template name="cleanFlag"><xsl:with-param name="flag" select="audioCodec"/></xsl:call-template>"</xsl:if>
	<xsl:if test="audioChannels!='UNKNOWN'">, "audioChannels": "<xsl:call-template name="cleanFlag"><xsl:with-param name="flag" select="audioChannels"/></xsl:call-template>"</xsl:if>
	<xsl:if test="watched!='UNKNOWN'">, "watched": <xsl:value-of select="watched"/></xsl:if>
	<xsl:if test="libraryDescription!='UNKNOWN' and libraryDescription!=''">, "library": "<xsl:value-of select="libraryDescription"/>"</xsl:if>
	<xsl:if test="count(genres/genre)!=0">, "genres": [<xsl:for-each select="genres/genre"> { "name": "<xsl:call-template name="fixText"><xsl:with-param name="text" select="." /></xsl:call-template>"<xsl:if test="@index!=''">, "url": "<xsl:value-of select="@index"/>"</xsl:if> }<xsl:if test="position()!=last()">,</xsl:if></xsl:for-each> ]</xsl:if>
	<xsl:if test="count(sets/set)!=0">, "sets": [<xsl:for-each select="sets/set"> { "name": "<xsl:call-template name="fixText"><xsl:with-param name="text" select="." /></xsl:call-template>"<xsl:if test="@index!=''">, "url": "<xsl:value-of select="@index"/>"</xsl:if> }<xsl:if test="position()!=last()">,</xsl:if></xsl:for-each> ]</xsl:if>
    <xsl:if test="count(cast/actor)!=0">, "cast": [<xsl:for-each select="cast/actor"> { "name": "<xsl:call-template name="fixText"><xsl:with-param name="text" select="." /></xsl:call-template>"<xsl:if test="@index!=''">, "url": "<xsl:value-of select="@index"/>"</xsl:if> }<xsl:if test="position()!=last()">,</xsl:if></xsl:for-each> ]</xsl:if>
    <xsl:if test="count(directors/director)!=0">, "directors": [<xsl:for-each select="directors/director"> { "name": "<xsl:call-template name="fixText"><xsl:with-param name="text" select="." /></xsl:call-template>"<xsl:if test="@index!=''">, "url": "<xsl:value-of select="@index"/>"</xsl:if> }<xsl:if test="position()!=last()">,</xsl:if></xsl:for-each> ]</xsl:if>
    <xsl:if test="count(extras/extra)!=0">, "extras": [<xsl:for-each select="extras/extra">
		{ 
			"title": "<xsl:call-template name="fixText"><xsl:with-param name="text" select="@title" /></xsl:call-template>", 
			"url": "<xsl:value-of select="." />"
		}<xsl:if test="position()!=last()">,</xsl:if></xsl:for-each>
	]</xsl:if>
}</xsl:template>
<xsl:template match="file">{
		"title": "<xsl:call-template name="fixText"><xsl:with-param name="text" select="@title" /></xsl:call-template>", 
		"url": "<xsl:value-of select='fileURL' />",<xsl:if test="@watched='true'">
		"watched": true,</xsl:if>
		"parts": "<xsl:value-of select='@firstPart'/><xsl:if test="@firstPart!=@lastPart">-<xsl:value-of select='@lastPart'/></xsl:if>",
		"plot": [ <xsl:for-each select="filePlot">"<xsl:call-template name="fixText"><xsl:with-param name="text" select="." /></xsl:call-template>"<xsl:if test="position()!=last()">, </xsl:if></xsl:for-each> ]
	}</xsl:template>
</xsl:stylesheet>
