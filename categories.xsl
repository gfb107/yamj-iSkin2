<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text" name="text"/>
<xsl:include href="skin-options.xsl"/>
<xsl:include href="preferences.xsl"/>
<xsl:template name="escapeQuote">
  <xsl:param name="text"/>
  <xsl:choose>
    <xsl:when test="contains($text, '&quot;')">
      <xsl:variable name="bufferBefore" select="substring-before($text,'&quot;')"/>
      <xsl:variable name="newBuffer" select="substring-after($text,'&quot;')"/>
      <xsl:call-template name="escapeQuote">
        <xsl:with-param name="text" select="$newBuffer"/>
      </xsl:call-template>
    </xsl:when>
    <xsl:otherwise>
      <xsl:value-of select="$text"/>
    </xsl:otherwise>
  </xsl:choose>
</xsl:template>
<xsl:template name="doPlayer"><xsl:param name="player"/><xsl:variable name="props" select="tokenize($player,':')"/>{ 
   "name": "<xsl:value-of select="$props[1]" />",
   "address": "<xsl:value-of select="$props[2]" />",
   "series": "<xsl:value-of select="$props[3]" />"
 }</xsl:template>
<xsl:template name="doMap"><xsl:param name="map"/><xsl:variable name="props" select="tokenize($map,'=')" />
    "<xsl:value-of select="$props[1]" />": "<xsl:value-of select="$props[2]" />"</xsl:template>
<xsl:template match="/library">{
  "doneUrl": "<xsl:value-of select="$skin-doneURL"/>",<xsl:if test="$skin-proxy!=''" >,
  "proxy": "<xsl:value-of select="$skin-proxy" />",</xsl:if>
  "certPrefix": "<xsl:choose><xsl:when test="$imdb.preferredCountry='USA'"></xsl:when><xsl:otherwise><xsl:value-of select="lower-case($imdb.preferredCountry)" /></xsl:otherwise></xsl:choose>",
  "players": [ <xsl:for-each select="tokenize($skin-nmtList,',')"><xsl:call-template name="doPlayer"><xsl:with-param name="player" select="."/></xsl:call-template><xsl:if test="position()!=last()">,</xsl:if></xsl:for-each> ],
  "urlMap" : { <xsl:for-each select="tokenize($skin-urlMap,',')"><xsl:call-template name="doMap"><xsl:with-param name="map" select="." /></xsl:call-template><xsl:if test="position()!=last()">,</xsl:if></xsl:for-each>
  },
  "videos": [<xsl:for-each select="movie"><xsl:apply-templates select="."/><xsl:if test="position()!=last()">, </xsl:if></xsl:for-each>
  ],
  "categories": {
	"items": [<xsl:for-each select="category"><xsl:apply-templates select="."/><xsl:if test="position()!=last()">, </xsl:if></xsl:for-each>
  ]}
}</xsl:template>
<xsl:template match="index">{ 
            "text": "<xsl:call-template name="escapeQuote"><xsl:with-param name="text" select="@name"/></xsl:call-template>",
            "leaf": true,
            "videos": [ <xsl:for-each select="movie"><xsl:value-of select="."/><xsl:if test="position()!=last()">, </xsl:if></xsl:for-each> ]
          }</xsl:template>
<xsl:template match="category">{
        "text": "<xsl:value-of select="@name"/>",
        "items": [<xsl:for-each select="index"><xsl:apply-templates select="."/><xsl:if test="position()!=last()">, </xsl:if></xsl:for-each>
        ]
      }</xsl:template>
<xsl:template match="movie">{
    "title": "<xsl:call-template name="escapeQuote"><xsl:with-param name="text" select="title" /></xsl:call-template><xsl:if test="season &gt; 0 and @isSet='false'"> Season <xsl:value-of select="season"/></xsl:if>",
    "type": "<xsl:choose><xsl:when test="@isExtra='true'">extra</xsl:when><xsl:when test="@isTV='true'">tv</xsl:when><xsl:otherwise>movie</xsl:otherwise></xsl:choose>",
    "file": "<xsl:value-of select="details"/>",
    "thumb": "<xsl:value-of select="thumbnail"/>"<xsl:if test="@isSet='true'">,
    "isSet": true</xsl:if><xsl:if test="watched='true'">,
	"watched": true</xsl:if>
  }</xsl:template>
</xsl:stylesheet>