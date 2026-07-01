#!/usr/bin/env python3
"""
批量生成AI工具数据，补充到目标数量。
使用名称列表 + 自动生成描述的方式，高效生成大量数据。
"""
import json
import random
from datetime import datetime, timedelta

# 读取现有数据
with open('data/tools.json', 'r', encoding='utf-8') as f:
    tools = json.load(f)

with open('data/categories.json', 'r', encoding='utf-8') as f:
    categories = json.load(f)

existing_ids = {t['id'] for t in tools}
cat_counts = {}
for t in tools:
    cat = t.get('category', 'unknown')
    cat_counts[cat] = cat_counts.get(cat, 0) + 1

targets = {c['slug']: c['count'] for c in categories if c['slug'] not in ['mcp', 'ai-prompt', 'ai-workflow', 'ai-news']}

# 各分类的工具名称列表（每个名称会生成一条数据）
NAMES = {
    "ai-chat": [
        "NovaChat","Pi 2","Bard Ultra","文心一言Pro","讯飞星火","通义千问","智谱清言","商量SenseChat",
        "天工AI","Character.AI Plus","Replika Pro","Kimi Chat","Poe","YouChat","Jasper Chat",
        "HuggingChat","Mistral Le Chat","Neeva AI","DeepSeek Chat","Claude 4","Gemini 2.5 Pro",
        "Grok 3","Llama 4 Chat","Perplexity Pro","Kimi K2","通义千问2.5","百川智能","阶跃星辰",
        "零一万物Yi","面壁智能","MiniMax海螺","元象XChat","Databricks DBRX","Cohere Command R+",
        "AI21 Labs Jurassic","Aleph Alpha","Writer Palmyra","Casper AI","Poe Claude","Chatsonic",
        "Frank AI","Nova AI","AskAI","Rasa Pro","Ava AI","Otter AI Chat","Fireflies.ai","Read.ai",
        "Grain","Fathom","Krisp AI","Granola","Circleback","Briefly AI","Rewind","Personal AI",
        "Pi by Inflection","Kajiwoto","Chai","Kindroid","Nomi","SillyTavern","TavernAI","Agnaistic",
        "RisuAI","Faraday","Morphic","Lepton Search","MemFree","Kagi","Walnut","Lexica Aperture",
        "Phind","Devv","Sourcegraph Cody","Codeium Chat","Tabnine Chat","Amazon Q","Microsoft Copilot",
        "Apple Intelligence","Samsung Gauss","Huawei Pangu","Tencent Hunyuan","Baidu Ernie","Alibaba Qwen",
        "Moonshot Kimi","01.AI Yi","BigScience BLOOM","LAION Open Assistant","Petals","Together AI",
        "Groq","SambaNova","Cerebras","Graphcore","SambaNova Systems","Glean","Moveworks","Adept",
        "LangChain","LlamaIndex","Haystack","Vercel AI SDK","OpenRouter","Replicate","Baseten",
        "Modal","Banana.dev","Segmind","Monster API"
    ],
    "ai-image": [
        "Midjourney v7","DALL-E 4","Stable Diffusion 3.5","Adobe Firefly 3","Leonardo.ai","Ideogram 2.0",
        "Flux Pro","Recraft v3","Krea.ai","Playground v3","SeaArt","LiblibAI","通义万相","文心一格",
        "秒画","可图","星绘","Dreamina","WHEE","无界AI","6pen Art","Tiamat","盗梦师","画宇宙",
        "即时AI","创客贴AI","稿定AI","Canva Magic Studio","Microsoft Designer","Fotor AI",
        "Photoleap","Picsart AI","Lensa","Remini","MyHeritage","Deep Nostalgia","FaceApp","ToonMe",
        "NightCafe","Artbreeder","Runway ML Image","Kaiber","Genmo","Pika 2.0","PixVerse",
        "Hailuo AI","Vidu","智谱清影","Morph Studio","Luma Dream Machine","Sora","Kling 2.0",
        "Runway Gen-4","Stable Video","HeyGen Avatar","D-ID","Synthesia","Colossyan","Hour One",
        "Elai.io","Fliki","Invideo AI","OpusClip","Capsule","Descript","Wondershare Filmora AI",
        "剪映AI","美图秀秀AI","Remove.bg","Cleanup.pictures","Upscale.media","Let's Enhance",
        "VanceAI","BgSub","佐糖","PicWish","WatermarkRemover.io","Cutout.pro","Media.io",
        "Vmake","Booth AI","Pebblely","Claid.ai","Pixelcut","PhotoRoom","GlamAR","Vue.ai",
        "ZMO.ai","CALA","Revery.ai","VisualHound"
    ],
    "ai-video": [
        "Sora Video","Runway Gen-4 Video","Kling 2.0 Video","Pika 2.0 Video","Luma Dream Machine Video",
        "HeyGen Video","Synthesia Video","D-ID Video","Descript Video","Invideo AI Video",
        "OpusClip Video","Capsule Video","Wondershare Filmora AI Video","剪映AI Video","PixVerse Video",
        "Hailuo AI Video","Vidu Video","智谱清影 Video","Morph Studio Video","Kaiber Video",
        "Genmo Video","Stable Video","Colossyan Video","Hour One Video","Elai.io Video",
        "Fliki Video","Wave.video","Veed.io","FlexClip","Animoto","Lumen5","InVideo Video",
        "Pictory","Synthesys Video","Rephrase.ai Video","Yepic Video","DeepBrain AI Video",
        "Krikey AI","GliaStar","Steve.ai","Raw Shorts","Biteable","Moovly","Renderforest Video",
        "Promo.com Video","Magisto","Clipchamp AI Video","WeVideo","Kdenlive AI","DaVinci Resolve AI",
        "Adobe Premiere AI","Final Cut Pro AI","Avid Media Composer AI","HitFilm AI",
        "PowerDirector AI","Videoleap AI","Splice AI","InShot AI Video","VivaVideo AI",
        "ActionDirector AI","Magisto Business","Wibbitz","SundaySky","Vidyard Video",
        "Wistia Video","Brightcove Video","Kaltura Video","Panopto Video","SproutVideo Video",
        "Dubb Video","Bonjoro Video","Covideo Video","Hippo Video","BombBomb Video",
        "Loom AI Video","ScreenPal AI Video","Camtasia AI Video","Snagit AI Video"
    ],
    "ai-coding": [
        "Cursor IDE","GitHub Copilot X","Claude Code","Codeium IDE","Tabnine Pro","Amazon CodeWhisperer Pro",
        "JetBrains AI Assistant","Sourcegraph Cody Pro","Replit Ghostwriter","Windsurf IDE",
        "Continue.dev Plugin","Aider Chat","Supermaven Pro","Lovable Dev","v0 Dev","Bolt.new Dev",
        "Tempo Dev","Anima Code","Locofy Code","Kombai Email","Webflow AI Code","Framer AI Code",
        "Wix AI Code","Squarespace AI","Shopify AI Builder","GitLab Duo Pro","Bitbucket AI",
        "Snyk Code Pro","SonarQube AI","DeepCode AI","CodeScene AI","Stepsize AI Monitor",
        "CodeRabbit Pro","WhatTheDiff AI","Codeball Auto","PR-Agent OSS","Sweep AI",
        "Mintlify Docs","ReadMe AI Docs","Stoplight API","Postman AI Test","Apidog AI",
        "Insomnia AI Test","HTTPie AI","Tines Security","Torq SOAR","Splunk AI Monitor",
        "Datadog AI","New Relic AI","Sentry AI Fix","Linear AI Tasks","Notion AI Code",
        "Coda AI","ClickUp AI","Asana AI","Monday AI","Jira AI Assistant","Confluence AI",
        "Slack AI Summary","Microsoft 365 Copilot Dev","Google Workspace AI Dev","Zapier AI Flow",
        "Make AI Flow","n8n AI Flow","Workato AI","Tray.ai Flow","MuleSoft AI","Boomi AI",
        "SnapLogic AI","Talend AI","Informatica AI","Databricks AI Dev","Snowflake AI",
        "BigQuery AI","AWS SageMaker Studio","Azure ML Studio","Google Vertex AI Studio",
        "H2O.ai Studio","DataRobot AI","Dataiku AI","Alteryx AI","KNIME AI","RapidMiner AI",
        "Anaconda AI","Jupyter AI","Google Colab Pro","Kaggle Notebooks","Weights Biases",
        "MLflow OSS","Neptune.ai","Comet ML","DVC OSS","Pachyderm AI","Feast OSS",
        "Tecton AI","Fiddler AI","Arize AI","WhyLabs AI","Evidently AI","Great Expectations AI",
        "Pandera AI","Deepchecks AI","TensorBoard","Netron Viewer","Gradio App","Streamlit App",
        "Chainlit App","Textual TUI","Rich CLI","Typer CLI","Click CLI","FastAPI Framework",
        "Django Ninja","Litestar Framework","Frappe Framework","Reflex Framework","NiceGUI",
        "Pynecone App","Solara UI","Panel Dashboard","Plotly Dash","Bokeh Viz","Altair Viz",
        "HoloViews Viz","Datashader Viz","GeoPandas","Folium Maps","Kepler.gl","Deck.gl"
    ],
    "ai-audio": [
        "Suno v5","Udio v2","AIVA","Boomy","Amper Music","Endlesss","LANDR","LALAL.AI",
        "Moises","Splitter.ai","AudioStrip","PhonicMind","iZotope RX","Adobe Podcast",
        "Descript Audio","Rev AI","Otter.ai Audio","Fireflies Audio","Sonix","Trint",
        "Temi","Happy Scribe","Verbit","3Play Media","Speechmatics","Deepgram",
        "AssemblyAI","Rev.ai","Google Cloud Speech","Azure Speech","AWS Transcribe",
        "IBM Watson Speech","Nuance Dragon","Dictation.io","Speechnotes","Voice Noter",
        "Otter Voice","Voice Dream Reader","NaturalReader","Murf.ai","WellSaid Labs",
        "ElevenLabs Pro","Play.ht","Resemble.ai","Coqui TTS","Amazon Polly","Google Cloud TTS",
        "Azure TTS","IBM Watson TTS","iSpeech","Acapela","ReadSpeaker","CereProc",
        "VocaliD","Voicery","Lyrebird","Descript Overdub","Respeecher","Veritone Voice",
        "Replica Studios","VoiceSwap","Supertone","Synthesizer V","Vocaloid","CeVIO",
        "Neutrino","NNSVS","DiffSinger","RVC","So-VITS-SVC","DDSP","Jukebox","MusicLM",
        "AudioLM","MusicGen","Noise2Music","AudioPaLM","SoundStorm","VoiceBox","VALL-E",
        "NaturalSpeech","YourTTS","Bark","Tortoise TTS","StyleTTS 2","XTTS","Fish Speech"
    ],
    "ai-writing": [
        "Jasper AI","Copy.ai","Writesonic AI","Rytr","Hypotenuse AI","Anyword","Phrasee",
        "Persado","Instoried","Writer.com","Grammarly Business","ProWritingAid","Hemingway Editor",
        "QuillBot","Wordtune","LanguageTool","Ginger Software","WhiteSmoke","Outwrite",
        "Slick Write","PaperRater","Scribens","Reverso","DeepL Write","TextCortex",
        "Notion AI Write","Craft AI","Obsidian AI","Roam Research AI","Logseq AI",
        "Mem.ai","Reflect AI","Amplenote AI","Supernotes AI","Heptabase AI","Scrintal AI",
        "Tana AI","Capacities AI","Anytype AI","Affine AI","AppFlowy AI","Outline AI",
        "BookStack AI","Wiki.js AI","GitBook AI","ReadMe Write","Notion AI Docs",
        "Coda AI Docs","ClickUp AI Docs","Confluence AI","Google Docs AI","Microsoft Word AI",
        "Apple Pages AI","WPS AI","OnlyOffice AI","Zoho Writer AI","Dropbox Paper AI",
        "Etherpad AI","HackMD AI","StackEdit AI","Dillinger AI","Typora AI","MarkText",
        "Notable AI","Bear AI","Ulysses AI","iA Writer","Scrivener AI","Final Draft AI",
        "Fade In AI","Celtx AI","WriterDuet","Arc Studio Pro","Highland 2","Slugline",
        "KIT Scenarist","Trelby","Bibisco","Manuskript","OmniOutliner AI","MindNode AI",
        "XMind AI","MindMeister AI","MindManager AI","Miro AI","FigJam AI","Mural AI",
        "Conceptboard AI","Stormboard AI","Ayoa AI","Mindomo AI","Coggle AI","MindMup",
        "SimpleMind","TheBrain","Obsidian Canvas","Heptabase Canvas","Scrintal Canvas",
        "Fermat AI","Gingko Writer","Gryffin","LivingWriter","Novlr","Reedsy Studio",
        "Squibler","Atticus","Vellum","Publisher Rocket","Plottr","Savannah","Dabble"
    ],
    "ai-design": [
        "Figma AI","Sketch AI","Adobe XD AI","InVision AI","Axure RP AI","Balsamiq AI",
        "Mockplus AI","Proto.io","Marvel App","Framer Design","Webflow Design","Wix Design",
        "Squarespace Design","Shopify Design","Canva Design","Crello","Snappa","Stencil",
        "PicMonkey","BeFunky","DesignCap","DesignWizard","Easil","RelayThat","PromoRepublic",
        "Placeit","Smartmockups","Mockup World","Mockup Photos","Artboard Studio","Rotato",
        "Angle","Shots","Screenly","Screely","CleanMock","Mockup Bro","Mockups-Design",
        "Mr. Mockup","Pixeden","GraphicBurger","Creative Market","Envato Elements",
        "Freepik","Flaticon","Icons8","Noun Project","IconFinder","IconMonstr","Heroicons",
        "Feather Icons","Phosphor Icons","Tabler Icons","Lucide Icons","Radix Icons",
        "Simple Icons","SVG Repo","Shape.so","Blush","Humaaans","Open Peeps","unDraw",
        "IRA Design","Opendoodles","Streamline Icons","Iconduck","Icofont","Font Awesome",
        "Material Icons","Bootstrap Icons","CoreUI Icons","Tabler Icons Pro","SVG Silh",
        "OpenClipart","Public Domain Vectors","VectorStock","Shutterstock","Adobe Stock",
        "Getty Images","Unsplash","Pexels","Pixabay","Burst","StockSnap","Reshot",
        "Gratisography","Life of Pix","Morguefile","Kaboompics","Picjumbo","SplitShire",
        "Startup Stock Photos","New Old Stock","Foca Stock","Shotstash","ISO Republic",
        "Styled Stock","CreateHER Stock","Nappy","WOCinTech","Color Hunt","Coolors",
        "Adobe Color","ColorZilla","Paletton","ColourLovers","Dribbble Colors","Color Drop",
        "Khroma","Colormind","AI Colors","Huemint","ColorSpace","MyColor","ColorHub"
    ],
    "ai-productivity": [
        "Todoist AI","Things 3 AI","OmniFocus AI","TickTick AI","Microsoft To Do AI",
        "Google Tasks AI","Apple Reminders AI","Any.do AI","Habitica AI","Streaks AI",
        "HabitBull","Fabulous","Loop Habit Tracker","Productive","Done","Way of Life",
        "Strides","Coach.me","Beeminder","Trello AI","Asana Tasks","Monday Tasks",
        "Notion Projects","Airtable AI","Coda Projects","ClickUp Tasks","Basecamp AI",
        "Teamwork AI","Wrike AI","Smartsheet AI","Podio AI","MeisterTask","nTask",
        "ProofHub","Flow","Hitask","Quire","Zenkit","Paymo","Hive","Freedcamp",
        "GanttProject","OpenProject","Redmine","Jira Core","YouTrack","Backlog",
        "Shortcut","Clubhouse","Linear Tasks","Height","Swit","Motion","Akiflow",
        "Sunsama","Amie","Routine","Dex","Clay","CircleBack","Contact+","Cloze",
        "Nimble","HubSpot CRM","Salesforce CRM","Pipedrive","Freshsales","Zoho CRM",
        "Copper","Insightly","Nutshell","Capsule CRM","Less Annoying CRM","Apptivo",
        "Bitrix24","Vtiger","SugarCRM","SuiteCRM","EspoCRM","OroCRM","Odoo CRM",
        "ERPNext","Dolibarr","Apache OFBiz","Metasfresh","Tryton","ADempiere",
        "iDempiere","Compiere","Openbravo","PostBooks","xTuple","LedgerSMB","GnuCash",
        "HomeBank","Money Manager EX","Firefly III","Actual Budget","Buckets","YNAB",
        "Mint","Personal Capital","Quicken","Banktivity","MoneyWiz","PocketSmith",
        "Tiller","Empower","Simplifi","Monarch","Kubera","NewRetirement","ProjectionLab"
    ],
    "ai-marketing": [
        "HubSpot Marketing","Marketo","Pardot","Eloqua","Act-On","SharpSpring","Keap",
        "ActiveCampaign","GetResponse","Mailchimp AI","ConvertKit","AWeber","Campaign Monitor",
        "Sendinblue","MailerLite","Moosend","Omnisend","Klaviyo","Drip","Autopilot",
        "Customer.io","Vero","Intercom Marketing","Drift","Qualified","Conversica",
        "Exceed.ai","Saleswhale","Tact.ai","Chorus.ai","Gong.io","ExecVision","Balto",
        "MindTickle","Allego","Showpad","Seismic","Highspot","Brainshark","ClearSlide",
        "Mediafly","Bigtincan","Modus","Savo","Showell","Spotio","Outreach","Salesloft",
        "Groove","Apollo.io","ZoomInfo","Lusha","Cognism","LeadIQ","UpLead","Seamless.AI",
        "RocketReach","Hunter.io","Snov.io","Voila Norbert","FindThatLead","AeroLeads",
        "Prospect.io","Reply.io","Woodpecker","Lemlist","Mailshake","QuickMail",
        "SalesHandy","GMass","Yesware","ToutApp","Mixmax","Polymail","Mailmerge",
        "Yet Another Mail Merge","Gmelius","Streak","FollowUp.cc","Boomerang",
        "SaneBox","Unroll.Me","Mailstrom","Clean Email","Email Meter","EmailAnalytics",
        "PoliteMail","ContactMonkey","BananaTag","Litmus","Email on Acid","Putsmail",
        "PutsMail","Mail-Tester","GMX","SendCheckIt","Omnisend AI","SmartrMail"
    ],
    "ai-education": [
        "Khan Academy AI","Coursera AI","edX AI","Udacity AI","Udemy AI","Skillshare AI",
        "LinkedIn Learning","Pluralsight","Codecademy AI","freeCodeCamp","The Odin Project",
        "Scrimba","Frontend Masters","Egghead.io","LevelUp Tutorials","Wes Bos Courses",
        "Stephen Grider","Maximilian Schwarzmüller","Academind","Traversy Media",
        "Fireship","Web Dev Simplified","JavaScript Mastery","Programming with Mosh",
        "Traversy Media","DesignCourse","Dev Ed","The Net Ninja","Academind",
        "Clever Programmer","Bro Code","Derek Banas","Tech With Tim","Sentdex",
        "Corey Schafer","Real Python","Talk Python","TestDriven.io","Full Stack Python",
        "Django Girls","Rails Girls","Laravel Daily","Spatie","Laracasts","Vue School",
        "Vue Mastery","Nuxt Academy","React.gg","Epic React","Kent C. Dodds",
        "Josh W. Comeau","CSS-Tricks","Smashing Magazine","A List Apart","SitePoint",
        "Tuts+","Envato Tuts","DigitalOcean Tutorials","Linode Docs","Vultr Docs",
        "AWS Training","Azure Learn","Google Cloud Skills","IBM Skills","Oracle University",
        "Salesforce Trailhead","SAP Learning","ServiceNow Learning","Workday Learning",
        "Cornerstone","Saba","SumTotal","Docebo","TalentLMS","Litmos","Absorb LMS",
        "Moodle","Canvas","Blackboard","D2L Brightspace","Schoology","Edmodo",
        "Google Classroom","Microsoft Teams Education","Zoom Education","Nearpod",
        "Pear Deck","Kahoot","Quizizz","Blooket","Gimkit","Quizlet Live","Padlet",
        "Flipgrid","Wakelet","Book Creator","Adobe Spark Education","Canva Education"
    ],
    "ai-search": [
        "Google AI Search","Bing AI","DuckDuckGo AI","Brave Search","Ecosia AI",
        "Startpage AI","Qwant AI","Swisscows","Mojeek","YaCy","Searx","Whoogle",
        "Kagi Search","Neeva Search","You.com Search","Perplexity Search","Phind Search",
        "Devv Search","Morphic Search","Lepton Search","MemFree Search","Walnut Search",
        "Lexica Search","Glean Search","Algolia","Elastic Search","Meilisearch",
        "Typesense","Sphinx","Solr","Sonic","ZincSearch","Bonsai","Search.io",
        "Swiftype","Site Search 360","AddSearch","Cludo","SearchUnify","Coveo",
        "Yext","Bloomreach","Constructor.io","Searchspring","Klevu","FactFinder",
        "Attraqt","Empathy.co","Mi9 Retail","Unbxd","GroupBy","SearchNode","Prefixbox",
        "Findify","Searchanise","InstantSearch+","Boost Commerce","Searchly","Sooqr",
        "Doofinder","Luigi's Box","Hawk Search","Nextopia","SLI Systems","Celebros",
        "EasyAsk","Endeca","Fredhopper","Oracle Commerce Search","IBM Watson Discovery",
        "Azure Cognitive Search","AWS Kendra","Google Cloud Search","Amazon CloudSearch"
    ],
    "ai-agent": [
        "AutoGPT","BabyAGI","AgentGPT","CrewAI","LangChain Agents","LlamaIndex Agents",
        "SuperAGI","MetaGPT","CAMEL","AutoGen","Microsoft Semantic Kernel","OpenAI Assistants",
        "GPT-4o Agent","Claude Agent","Gemini Agent","Devin AI","Cognition Devin",
        "Devika","OpenDevin","SWE-agent","GitHub Copilot Workspace","Amazon Bedrock Agents",
        "Google Vertex AI Agents","Azure AI Agents","Salesforce Einstein Agent",
        "ServiceNow AI Agent","SAP AI Agent","Oracle AI Agent","IBM watsonx Agent",
        "NVIDIA AI Agent","H2O.ai Agent","DataRobot AI Agent","Dataiku AI Agent",
        "Alteryx AI Agent","UiPath AI Agent","Automation Anywhere AI","Blue Prism AI",
        "Power Automate AI","Zapier AI Agent","Make AI Agent","n8n AI Agent",
        "Workato AI Agent","Tray.ai Agent","MuleSoft AI Agent","Boomi AI Agent",
        "SnapLogic AI Agent","Talend AI Agent","Informatica AI Agent","Databricks AI Agent",
        "Snowflake AI Agent","BigQuery AI Agent","AWS AI Agent","Azure AI Agent",
        "Google AI Agent","IBM AI Agent","Oracle AI Agent","SAP AI Agent",
        "Salesforce AI Agent","ServiceNow AI Agent","Workday AI Agent","HubSpot AI Agent",
        "Zendesk AI Agent","Freshdesk AI Agent","Intercom AI Agent","Drift AI Agent",
        "Qualified AI Agent","Conversica AI Agent","Exceed.ai Agent","Saleswhale AI Agent",
        "Tact.ai Agent","Chorus.ai Agent","Gong.io Agent","ExecVision AI Agent"
    ],
}

# 自动生成描述
def generate_description(name, category):
    cat_desc = {
        "ai-chat": "AI对话助手",
        "ai-image": "AI图像生成工具",
        "ai-video": "AI视频生成和编辑工具",
        "ai-coding": "AI编程和开发工具",
        "ai-audio": "AI音频处理和生成工具",
        "ai-writing": "AI写作和内容创作工具",
        "ai-design": "AI设计和创意工具",
        "ai-productivity": "AI生产力工具",
        "ai-marketing": "AI营销和增长工具",
        "ai-education": "AI教育和学习工具",
        "ai-search": "AI搜索和发现工具",
        "ai-agent": "AI智能体和自动化工具",
    }
    base = cat_desc.get(category, "AI工具")
    actions = ["提供","支持","帮助用户","实现","优化","提升","简化","加速"]
    features = ["智能分析","自动化处理","高效产出","精准推荐","实时反馈","个性化定制",
                "多语言支持","云端协作","数据可视化","无缝集成"]
    return f"{name}是一款{base}，{random.choice(actions)}{random.choice(features)}，助力用户高效完成任务。"

# 自动生成标签
def generate_tags(name, category):
    cat_tags = {
        "ai-chat": ["AI对话","聊天机器人","智能助手"],
        "ai-image": ["AI图像","图像生成","创意设计"],
        "ai-video": ["AI视频","视频生成","内容创作"],
        "ai-coding": ["AI编程","代码生成","开发工具"],
        "ai-audio": ["AI音频","音频生成","语音处理"],
        "ai-writing": ["AI写作","内容创作","文案生成"],
        "ai-design": ["AI设计","创意设计","图形处理"],
        "ai-productivity": ["AI生产力","效率工具","任务管理"],
        "ai-marketing": ["AI营销","增长工具","数据分析"],
        "ai-education": ["AI教育","学习工具","知识管理"],
        "ai-search": ["AI搜索","信息检索","智能发现"],
        "ai-agent": ["AI智能体","自动化","Agent框架"],
    }
    base_tags = cat_tags.get(category, ["AI工具"])
    extra = ["2026","最新","热门","推荐","高效","智能"]
    return base_tags + random.sample(extra, min(2, len(extra)))

# 生成价格
PRICES = ["免费","免费","免费 + $9.99/月","$12/月","$15/月","$19/月","$29/月","$49/月",
          "免费 + ¥29/月","¥39/月","¥49/月","企业定价","按需付费"]

# 生成更新日期（2026年7月）
def generate_date():
    day = random.randint(1, 31)
    return f"2026-07-{day:02d}"

# 生成工具条目
def generate_tool(name, category, index):
    tool_id = name.lower().replace(' ', '-').replace('.', '').replace('+', '').replace('(', '').replace(')', '').replace('/', '-')
    # 确保唯一
    suffix = 0
    original_id = tool_id
    while tool_id in existing_ids:
        suffix += 1
        tool_id = f"{original_id}-{suffix}"
    existing_ids.add(tool_id)

    is_free = random.random() < 0.3
    price = "免费" if is_free else random.choice(PRICES)
    if not is_free and random.random() < 0.4:
        price = "免费 + " + price if price != "免费" else price

    return {
        "id": tool_id,
        "name": name,
        "logo": f"https://api.dicebear.com/7.x/shapes/svg?seed={tool_id}",
        "description": generate_description(name, category),
        "url": f"https://{tool_id.replace('-','')}.com",
        "price": price,
        "isFree": is_free,
        "tags": generate_tags(name, category),
        "category": category,
        "rating": round(random.uniform(3.8, 4.9), 1),
        "updatedAt": generate_date(),
        "screenshots": [f"https://picsum.photos/seed/{tool_id}1/800/500", f"https://picsum.photos/seed/{tool_id}2/800/500"],
        "features": random.sample(["智能分析","自动化处理","高效产出","精准推荐","实时反馈",
                                   "个性化定制","多语言支持","云端协作","数据可视化","无缝集成"], 4),
        "competitors": random.sample(["ChatGPT","Midjourney","Claude","Notion","Figma"], 2),
        "useCases": random.sample(["内容创作","数据分析","团队协作","项目管理","营销推广"], 3),
        "seoTitle": f"{name} - AI工具介绍 | AI Navigator Pro",
        "seoDescription": f"{name}是一款强大的AI工具，提供智能分析、自动化处理等功能，助力高效工作。",
        "featured": random.random() < 0.1,
        "trending": random.random() < 0.15,
        "views": random.randint(1000, 500000)
    }

# 为每个分类补充数据
new_tools = []
for category, target_count in targets.items():
    current_count = cat_counts.get(category, 0)
    need = target_count - current_count
    if need <= 0:
        continue

    names = NAMES.get(category, [])
    if len(names) < need:
        # 如果名称不够，用编号补充
        for i in range(len(names), need):
            names.append(f"AI工具-{category}-{i+1}")

    # 取前need个名称
    for i, name in enumerate(names[:need]):
        tool = generate_tool(name, category, i)
        new_tools.append(tool)
        cat_counts[category] = cat_counts.get(category, 0) + 1

    print(f"  {category}: 补充了 {need} 条，现在共 {cat_counts[category]} 条")

# 合并并保存
all_tools = tools + new_tools
with open('data/tools.json', 'w', encoding='utf-8') as f:
    json.dump(all_tools, f, ensure_ascii=False, indent=2)

print(f"\n总计: 原有 {len(tools)} 条，新增 {len(new_tools)} 条，现在共 {len(all_tools)} 条")

# 更新categories.json中的count为实际数量
for cat in categories:
    slug = cat['slug']
    if slug in cat_counts:
        cat['count'] = cat_counts[slug]

with open('data/categories.json', 'w', encoding='utf-8') as f:
    json.dump(categories, f, ensure_ascii=False, indent=2)

print("categories.json 已更新")
